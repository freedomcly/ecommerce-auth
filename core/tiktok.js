import {
  requestGetAccessToken,
  requestRefreshAccessToken,
} from '../requests/tiktok.js'

export default {
  getAuthUrl: null,
  // code 30min过期
  // access token 7天过期
  getAccessToken: (options) => {
    return requestGetAccessToken(options)
  },
  refreshAccessToken: (options) => {
    return requestRefreshAccessToken(options)
  },
}
