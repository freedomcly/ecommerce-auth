// import path = require('path');

export default {
  // 数据库配置
  database: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/products",
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
  },

  // JWT配置
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    //   expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    //   refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
  },

  // 第三方API配置
  apis: {
    tiktok: {
      appKey: process.env.TIKTOK_APP_KEY || "your-app-key",
      appSecret: process.env.TIKTOK_APP_SECRET || "your-app-secret",
      domain: process.env.TIKTOK_DOMAIN || "tiktok-shops.com",
    },
    coupang: {
      accessKey: process.env.COUPANG_ACCESS_KEY || "your-access-key",
      secretKey: process.env.COUPANG_SECRET_KEY || "your-secret-key",
    },
    shopee: {
      partnerId: process.env.SHOPEE_PARTNER_ID || "your-partner-id",
      partnerKey: process.env.SHOPEE_PARTNER_KEY || "your-partner-key",
      merchantId: process.env.SHOPEE_MERCHANT_ID || "your-merchant-id",
      domain: process.env.SHOPEE_DOMAIN || "api.shopee.com",
      mainAccountId:
        process.env.SHOPEE_MAIN_ACCOUNT_ID || "your-main-account-id",
    },
    lazada: {
      appKey: process.env.LAZADA_APP_KEY || "your-app-key",
      appSecret: process.env.LAZADA_APP_SECRET || "your-app-secret",
      signMethod: process.env.LAZADA_SIGN_METHOD || "",
    },
    aliyun: {
      accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID || "your-access-key-id",
      accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET || "",
      region: process.env.ALIYUN_REGION || "",
      bucket: process.env.ALIYUN_BUCKET || "",
    },
  },

  // 服务器配置
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
    cors: {
      origin: process.env.CORS_ORIGIN || "*",
      credentials: true,
    },
  },

  // 文件上传配置
  upload: {
    cleanupInterval: process.env.CLEANUP_INTERVAL || 1000 * 60 * 60,
    // dir: process.env.UPLOAD_DIR || path.join(__dirname, '../../tmp')
    //   maxSize: process.env.UPLOAD_MAX_SIZE || 5 * 1024 * 1024, // 5MB
    //   allowedTypes: ['image/jpeg', 'image/png', 'application/pdf']
  },

  // 日志配置
  // logging: {
  //   level: process.env.LOG_LEVEL || 'info',
  //   dir: process.env.LOG_DIR || 'logs',
  //   maxSize: process.env.LOG_MAX_SIZE || '20m',
  //   maxFiles: process.env.LOG_MAX_FILES || '14d'
  // }
};
