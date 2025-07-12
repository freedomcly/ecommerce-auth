import request from 'superagent';

export function requestGetAccessToken(code, app_key) {
  return new Promise((resolve, reject) => {
    request
      .get('http://auth.tiktok-shops.com/api/v2/token/get')
      .set('Content-Type', 'application/json')
      .query({
        app_secret,
        auth_code: code,
        app_key,
        grant_type: 'authorized_code',
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
