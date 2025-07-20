import crypto from 'node:crypto'

export function getSign({
  partnerId,
  partnerKey,
  path,
  accessToken,
  merchantId,
  shopId,
}) {
  const hmac = crypto.createHmac('sha256', partnerKey)
  const timestamp = Math.floor(new Date().getTime() / 1000)
  let baseString = `${partnerId}${path}${timestamp}`

  if (accessToken) baseString += accessToken
  if (merchantId) baseString += merchantId
  if (shopId) baseString += shopId

  const sign = hmac.update(baseString).digest('hex')
  return {
    sign,
    timestamp,
  }
}

export function getSignLazada(apiPath, params, app_secret) {
  const timestamp = new Date().getTime()

  const filteredParams = {}
  Object.keys(params).forEach(key => {
    if (key !== 'sign' && typeof params[key] !== 'object') {
      filteredParams[key] = params[key]
    }
  })
  filteredParams.timestamp = timestamp

  const sortedKeys = Object.keys(filteredParams).sort()

  let concatenatedString = ''
  sortedKeys.forEach(key => {
    concatenatedString += key + filteredParams[key]
  })

  const stringToSign = apiPath + concatenatedString

  const hmac = crypto.createHmac('sha256', app_secret)
  hmac.update(stringToSign, 'utf8')
  const sign = hmac.digest('hex').toUpperCase()

  return {
    sign,
    timestamp
  }
}
