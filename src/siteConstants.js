/* This file includes the constants necessary to power the API homepage */
export const PORT = 8080;
export const API_FROM_EMAIL = 'kedu@nkowaokwu.com';
export const APP_URL = 'https://igboapi.com';
export const API_ROUTE = process.env.NODE_ENV === 'production'
  ? `https://${APP_URL}`
  : `http://localhost:${PORT}`;
export const DICTIONARY_APP_URL = 'https://nkowaokwu.com/home';
export const GITHUB_REPO = 'https://github.com/nkowaokwu/igbo_api';
export const GITHUB_CONTRIBUTORS = 'https://api.github.com/repos/nkowaokwu/igbo_api/contributors';
export const GITHUB_STARS = 'https://api.github.com/repos/nkowaokwu/igbo_api';

// Social media
export const TWITTER = 'https://twitter.com/nkowaokwu';
export const INSTAGRAM = 'https://www.instagram.com/nkowaokwu';
export const LINKEDIN = 'https://www.linkedin.com/company/nkowa-okwu';

// Projects
export const NKOWAOKWU = 'https://nkowaokwu.com';
export const NKOWAOKWU_CHROME = 'https://nkowaokwu.com/chrome';
