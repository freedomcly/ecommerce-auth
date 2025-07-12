import request from "superagent";
import { getSign } from "../crypto.js";

const DOMAIN_SHOPEE = "https://openplatform.shopee.cn";
const PREFIX_SHOPEE = "/api/v2";
const SHOPEE_AUTH_PARTNER = "/api/v2/shop/auth_partner";
const AUTH_TOKEN_GET = "/api/v2/auth/token/get";
const AUTH_ACCESS_TOKEN_GET = "/api/v2/auth/access_token/get";

export function requestGetAccessToken(options) {
  const path = AUTH_TOKEN_GET;
  const { sign, timestamp } = getSign({
    path,
    partnerId: options.partner_id,
    partnerKey: options.partner_key,
  });
  const { partner_id, code, main_account_id } = options;

  return new Promise((resolve, reject) => {
    request
      .post(`${DOMAIN_SHOPEE}${path}`)
      .set("Content-Type", "application/json")
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
        resolve(JSON.parse(result.text));
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function requestRefreshAccessToken(options) {
  const path = AUTH_ACCESS_TOKEN_GET;
  const { sign, timestamp } = getSign({
    path,
    partnerId: options.partner_id,
    partnerKey: options.partner_key,
  });

  const sendData = {
    refresh_token: options.refresh_token,
    partner_id: options.partner_id,
  };

  if (options.shop_id) {
    sendData.shop_id = Number(options.shop_id);
  } else {
    sendData.merchant_id = Number(options.merchant_id);
  }

  return new Promise((resolve, reject) => {
    request
      .post(`${DOMAIN_SHOPEE}${path}`)
      .set("Content-Type", "application/json")
      .query({
        partner_id: options.partner_id,
        timestamp,
        sign,
      })
      .send(sendData)
      .then((result) => {
        resolve(JSON.parse(result.text));
      })
      .catch((err) => {
        reject(err);
      });
  });
}
