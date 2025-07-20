import request from 'superagent'
import { getSignLazada } from '../core/crypto.js'

import {
  DOMAIN_LAZADA, 
  PREFIX_LAZADA,
  AUTH_TOKEN_GET_LAZADA,
  AUTH_TOKEN_REFRESH_LAZADA
} from '../constants/index.js'

export function requestGetAccessToken(options) {
  const params = {
    app_key: options.app_key,
    sign_method: 'sha256',
    code: options.code
  }
  
  const { sign, timestamp } = getSignLazada(AUTH_TOKEN_GET_LAZADA, params, options.app_secret)
  
  params.sign = sign
  params.timestamp = timestamp

  const requestData = {
    url: `${DOMAIN_LAZADA}${PREFIX_LAZADA}${AUTH_TOKEN_GET_LAZADA}`,
    method: 'GET',
    query: params,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return new Promise((resolve, reject) => {
    const startTime = Date.now()
    
    request
      .get(requestData.url)
      .set(requestData.headers)
      .query(requestData.query)
      .then((result) => {
        const responseData = {
          success: true,
          data: JSON.parse(result.text),
          request: requestData,
          response: {
            status: result.status,
            headers: result.headers,
            responseTime: Date.now() - startTime
          }
        }
        resolve(responseData)
      })
      .catch((err) => {
        const errorData = {
          success: false,
          error: err.message,
          request: requestData,
          response: {
            status: err.status,
            headers: err.response?.headers,
            responseTime: Date.now() - startTime
          }
        }
        reject(errorData)
      })
  })
}

export function requestRefreshAccessToken(options) {
  // 构建请求参数（不含 timestamp）
  const params = {
    app_key: options.app_key,
    sign_method: 'sha256',
    refresh_token: options.refresh_token
  }
  
  // 生成签名和 timestamp
  const { sign, timestamp } = getSignLazada(AUTH_TOKEN_REFRESH_LAZADA, params, options.app_secret)
  
  // 添加签名和 timestamp到参数中
  params.sign = sign
  params.timestamp = timestamp

  const requestData = {
    url: `${DOMAIN_LAZADA}${PREFIX_LAZADA}${AUTH_TOKEN_REFRESH_LAZADA}`,
    method: 'GET',
    query: params,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return new Promise((resolve, reject) => {
    const startTime = Date.now()
    
    request
      .get(requestData.url)
      .set(requestData.headers)
      .query(requestData.query)
      .then((result) => {
        const responseData = {
          success: true,
          data: JSON.parse(result.text),
          request: requestData,
          response: {
            status: result.status,
            headers: result.headers,
            responseTime: Date.now() - startTime
          }
        }
        resolve(responseData)
      })
      .catch((err) => {
        const errorData = {
          success: false,
          error: err.message,
          request: requestData,
          response: {
            status: err.status,
            headers: err.response?.headers,
            responseTime: Date.now() - startTime
          }
        }
        reject(errorData)
      })
  })
}
