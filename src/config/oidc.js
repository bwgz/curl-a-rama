
const client_secret = import.meta.env.VITE_CLIENT_SECRET;
const redirect_uri = import.meta.env.VITE_REDIRECT_URI;

export const oidcSettings = {
    authority: 'https://accounts.google.com',
    client_id: '260770349013-ks1orjk0p0uohurl0f9phc3ed0pkqg1g.apps.googleusercontent.com', // client_id if you use typescript, see note below
    client_secret,
    redirect_uri,
    responseType: 'code',
    scope: 'openid email profile',
  }
  