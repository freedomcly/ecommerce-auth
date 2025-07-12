import crypto from 'node:crypto';

export function getSign({
  partnerId,
  partnerKey,
  path,
  accessToken,
  merchantId,
  shopId,
}) {
  const hmac = crypto.createHmac('sha256', partnerKey);
  const timestamp = Math.floor(new Date().getTime() / 1000);
  let baseString = `${partnerId}${path}${timestamp}`;

  if (accessToken) baseString += accessToken;
  if (merchantId) baseString += merchantId;
  if (shopId) baseString += shopId;

  const sign = hmac.update(baseString).digest('hex');
  return {
    sign,
    timestamp,
  };
}
