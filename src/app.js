import './services/firebase';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import morgan from 'morgan';
import compression from 'compression';
import './shared/utils/wrapConsole';
import {
  router,
  routerV2,
  siteRouter,
  testRouter,
} from './routers';
import cache from './middleware/cache';
import logger from './middleware/logger';
import errorHandler from './middleware/errorHandler';
import Versions from './shared/constants/Versions';
import { SWAGGER_DOCS, CORS_CONFIG, SWAGGER_OPTIONS } from './config';

const app = express();

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  app.use('*', logger);
}

/* Site config */
app.options('*', cors());
app.use(cors(CORS_CONFIG));
app.set('trust proxy', 1);

/* Provides static assets for the API Homepage */
app.use('/_next', express.static('./build/dist'));
app.use('/assets', cache(), express.static('./build/dist/assets'));
app.use('/fonts', cache(), express.static('./build/dist/fonts'));
app.use('/services', cache(), express.static('./services'));

/* Sets up the doc site */
app.use('/docs', swaggerUI.serve, swaggerUI.setup(SWAGGER_DOCS, SWAGGER_OPTIONS));

/* Grabs data from MongoDB */
app.use(`/api/${Versions.VERSION_1}`, cache(86400, 172800), router);
app.use(`/api/${Versions.VERSION_2}`, cache(86400, 172800), routerV2);

/* Grabs data from JSON dictionary */
if (process.env.NODE_ENV !== 'production') {
  app.use(
    `/api/${Versions.VERSION_1}/test`,
    testRouter,
  );
}

/* Renders the API Site */
app.use(siteRouter, cache());

/* Handles all uncaught errors */
app.use(errorHandler);

export default app;

export const api = app;
