import { getSign } from './crypto.js'
import {
  requestGetAccessToken,
  requestRefreshAccessToken,
} from '../requests/shopee.js'

import {DOMAIN_SHOPEE, SHOP_AUTH_PARTNER_SHOPEE} from '../constants/index.js'

export default {
  getAuthUrl: (options) => {
    const path = SHOP_AUTH_PARTNER_SHOPEE
    const { sign, timestamp } = getSign({
      path,
      partnerId: options.partner_id,
      partnerKey: options.partner_key,
    })
    return `${DOMAIN_SHOPEE}${path}?partner_id=${options.partner_id}&timestamp=${timestamp}&sign=${sign}&redirect=${options.redirect}`
  },
  // code 换 access token
  // code 10min过期
  // access token 4小时过期
  getAccessToken: (options) => {
    return requestGetAccessToken(options)
  },
  // refresh token 换 access token
  refreshAccessToken: (options) => {
    return requestRefreshAccessToken(options)
  },
}
