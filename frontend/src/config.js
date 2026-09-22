// API is served same-origin: fronsend/vercel.json proxies /api/* to the backend,
// so we just use relative paths (no CORS, no Vercel checkpoint issues).
export const API_URL = '';

// Contact details shared across the site
export const PHONE_DISPLAY = '+1 (555) 123-4567';
export const PHONE_TEL = '+15551234567';
export const WHATSAPP_NUMBER = '15551234567';
export const EMAIL = 'care@brightsmile.com';
export const OPENING_HOURS = [
  { days: 'Mon - Fri', hours: '9:00 AM - 5:00 PM' },
  { days: 'Saturday', hours: '9:00 AM - 1:00 PM' },
  { days: 'Sunday', hours: 'Closed' },
];