export default {
  // 第三方API配置
  apis: {
    tiktok: {
      appKey: process.env.TIKTOK_APP_KEY || 'your-app-key',
      appSecret: process.env.TIKTOK_APP_SECRET || 'your-app-secret',
      domain: process.env.TIKTOK_DOMAIN || 'tiktok-shops.com',
    },
    coupang: {
      accessKey: process.env.COUPANG_ACCESS_KEY || 'your-access-key',
      secretKey: process.env.COUPANG_SECRET_KEY || 'your-secret-key',
    },
    shopee: {
      partnerId: process.env.SHOPEE_PARTNER_ID || 'your-partner-id',
      partnerKey: process.env.SHOPEE_PARTNER_KEY || 'your-partner-key',
      merchantId: process.env.SHOPEE_MERCHANT_ID || 'your-merchant-id',
      domain: process.env.SHOPEE_DOMAIN || 'api.shopee.com',
      mainAccountId:
        process.env.SHOPEE_MAIN_ACCOUNT_ID || 'your-main-account-id',
    },
    lazada: {
      appKey: process.env.LAZADA_APP_KEY || 'your-app-key',
      appSecret: process.env.LAZADA_APP_SECRET || 'your-app-secret',
      signMethod: process.env.LAZADA_SIGN_METHOD || '',
    },
    aliyun: {
      accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID || 'your-access-key-id',
      accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET || '',
      region: process.env.ALIYUN_REGION || '',
      bucket: process.env.ALIYUN_BUCKET || '',
    },
  }
};
