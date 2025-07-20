import {
  requestGetAccessToken,
  requestRefreshAccessToken,
} from '../requests/lazada.js'

export default {
  getAuthUrl: (options) => {
    const { app_key, redirect_uri } = options
    return `https://auth.lazada.com/oauth/authorize?response_type=code&force_auth=true&redirect_uri=${redirect_uri}&client_id=${app_key}`
  },
  getAccessToken: (options) => {
    return requestGetAccessToken(options)
  },
  refreshAccessToken: (options) => {
    return requestRefreshAccessToken(options)
  },
} 