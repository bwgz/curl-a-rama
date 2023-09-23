
const client_secret = import.meta.env.VITE_CLIENT_SECRET;

console.log("client_secret", client_secret);

export const oidcSettings = {
    authority: 'https://accounts.google.com',
    client_id: '260770349013-ks1orjk0p0uohurl0f9phc3ed0pkqg1g.apps.googleusercontent.com', // client_id if you use typescript, see note below
    client_secret,
    redirect_uri: 'http://localhost:5173/curl-a-rama/callback', // client_id if you use typescript, see note below
    responseType: 'code',
    scope: 'openid email profile',
  }
  