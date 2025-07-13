# Ecommerce-auth

## 项目简介

Ecommerce-auth 是为电商平台（如Shopee/Tiktok/Lazada）开发的 Node.js 认证授权模块。它封装了电商开放平台的 OAuth 流程，帮助开发者快速、安全地实现账号授权、令牌获取与管理等功能。
本模块适用于需要对接 Shopee 等第三方电商平台 API 的中后台系统、ERP、SaaS 服务等场景。通过简单的配置和调用，即可完成平台账号授权、获取 access token、自动刷新 token 等操作，降低开发和维护成本。


## 安装

```bash
npm install ecommerce-auth
```


## 快速开始

```typescript
import { ShopeeAuth } from 'ecommerce-auth';

const authUrl = ShopeeAuth.getAuthUrl({
  partner_id: '',
  partner_key: '',
  redirect: '',
  main_account_id: ''
});

const tokens = await ShopeeAuth.getAccessToken({
    code: '',
    partner_id: '',
    main_account_id: '',
    partner_key: ''
})
```

## 参考资料

* [OAuth 2.0 协议](https://oauth.net/2/)
* [Shopee开放平台](https://open.shopee.com/)
* [Tiktok Partner Center](https://partner.tiktokshop.com/)


## 许可证

ISC License
