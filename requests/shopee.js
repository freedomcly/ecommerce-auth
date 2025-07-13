import request from 'superagent'
import { getSign } from '../core/crypto.js'

import {DOMAIN_SHOPEE, AUTH_TOKEN_GET_SHOPEE, AUTH_ACCESS_TOKEN_GET_SHOPEE} from '../constants/index.js'

export function requestGetAccessToken(options) {
  const path = AUTH_TOKEN_GET_SHOPEE
  const { sign, timestamp } = getSign({
    path,
    partnerId: options.partner_id,
    partnerKey: options.partner_key,
  })
  const { partner_id, code, main_account_id } = options

  return new Promise((resolve, reject) => {
    request
      .post(`${DOMAIN_SHOPEE}${path}`)
      .set('Content-Type', 'application/json')
      .query({
        partner_id,
        timestamp,
        sign,
      })
      .send({
        partner_id,
        main_account_id,
        code,
      })
      .then((result) => {
        resolve(JSON.parse(result.text))
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function requestRefreshAccessToken(options) {
  const path = AUTH_ACCESS_TOKEN_GET_SHOPEE
  const { sign, timestamp } = getSign({
    path,
    partnerId: options.partner_id,
    partnerKey: options.partner_key,
  })

  const sendData = {
    refresh_token: options.refresh_token,
    partner_id: options.partner_id,
  }

  if (options.shop_id) {
    sendData.shop_id = Number(options.shop_id)
  } else {
    sendData.merchant_id = Number(options.merchant_id)
  }

  return new Promise((resolve, reject) => {
    request
      .post(`${DOMAIN_SHOPEE}${path}`)
      .set('Content-Type', 'application/json')
      .query({
        partner_id: options.partner_id,
        timestamp,
        sign,
      })
      .send(sendData)
      .then((result) => {
        resolve(JSON.parse(result.text))
      })
      .catch((err) => {
        reject(err)
      })
  })
}
