import { getSign } from "./crypto.js";
import {
  requestGetAccessToken,
  requestRefreshAccessToken,
} from "./requests/shopee.js";

const AUTH_PATH_SHOPEE =
  "https://openplatform.shopee.cn/api/v2/shop/auth_partner";

export const ShopeeAuth = {
  getAuthUrl: (options) => {
    const path = "/api/v2/shop/auth_partner";
    const { sign, timestamp } = getSign({
      path,
      partnerId: options.partner_id,
      partnerKey: options.partner_key,
    });
    return `${AUTH_PATH_SHOPEE}?partner_id=${options.partner_id}&timestamp=${timestamp}&sign=${sign}&redirect=${options.redirect}`;
  },
  // code 换 access token
  // code 10min过期
  // access token 4小时过期
  getAccessToken: (options) => {
    return requestGetAccessToken(options);
  },
  // refresh token 换 access token
  refreshAccessToken: (options) => {
    return requestRefreshAccessToken(options);
  },
};

export const TiktokAuth = {
  getAuthUrl: null, // 不知如何处理
  getAccessToken: (options) => {
    return "";
  },
  refreshAccessToken: (options) => {},
};
