import request from 'superagent'

import {DOMAIN_AUTH_TIKTOK, AUTH_TOKEN_GET_TIKTOK, AUTH_TOKEN_REFRESH_TIKTOK} from '../constants/index.js'

export function requestGetAccessToken(options) {
  return new Promise((resolve, reject) => {
    request
      .get(`${DOMAIN_AUTH_TIKTOK}${AUTH_TOKEN_GET_TIKTOK}`)
      .set('Content-Type', 'application/json')
      .query({
        app_secret: options.app_secret,
        auth_code: options.auth_code,
        app_key: options.app_key,
        grant_type: 'authorized_code',
      })
      .then((result) => {
        resolve(JSON.parse(result.text).data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function requestRefreshAccessToken(options) {
  return new Promise((resolve, reject) => {
    request
      .get(`${DOMAIN_AUTH_TIKTOK}${AUTH_TOKEN_REFRESH_TIKTOK}`)
      .set('Content-Type', 'application/json')
      .query({
        app_secret: options.app_secret,
        refresh_token: options.refresh_token,
        app_key: options.app_key,
        grant_type: 'refresh_token',
      })
      .then((result) => {
        resolve(JSON.parse(result.text).data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
