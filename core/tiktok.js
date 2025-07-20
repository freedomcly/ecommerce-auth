import {
  requestGetAccessToken,
  requestRefreshAccessToken,
} from '../requests/tiktok.js'

export default {
  getAuthUrl: null,
  getAccessToken: (options) => {
    return requestGetAccessToken(options)
  },
  refreshAccessToken: (options) => {
    return requestRefreshAccessToken(options)
  },
}
