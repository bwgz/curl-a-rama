export const oidcSettings = {
    authority: 'https://accounts.google.com',
    clientId: '260770349013-ks1orjk0p0uohurl0f9phc3ed0pkqg1g.apps.googleusercontent.com', // client_id if you use typescript, see note below
    clientSecret: "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",
    redirectUri: 'http://localhost:5173/curl-a-rama/callback', // client_id if you use typescript, see note below
    responseType: 'code',
    scope: 'openid email profile',
    postLogoutRedirectUri: 'http://localhost:5173/curl-a-rama',
  }
  