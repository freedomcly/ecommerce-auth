# Ecommerce-auth

## 项目简介

Ecommerce-auth 是为电商平台（如 Shopee / Tiktok / Lazada）开发的 Node.js 认证授权模块。它封装了电商开放平台的 OAuth 流程，帮助开发者快速、安全地实现账号授权、令牌获取与管理等功能。
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


## 授权过期时间

整理出的各平台过期时间，可以在对应的业务项目中做定时授权：

| **平台** | **Code** | **AccessToken** | **RefreshToken** | **是否提供已授权店铺查询接口** |
| :--- | :--- | :--- | :--- | :--- |
| Shopee | 10 min | 4 h | 30 d | 无 |
| Tiktok | 30 min | 7 d | 7 d? | 有 |
| Lazada | 30 min | 7 d | 14 d | 无 |


## API 文档

### 1. ShopeeAuth

#### ShopeeAuth.getAuthUrl(options)
- 生成 Shopee 平台授权链接。
- **参数**：
  - `partner_id` (string/number): 合作方ID
  - `partner_key` (string): 合作方密钥
  - `redirect` (string): 回调地址
- **返回**：string 授权链接

#### ShopeeAuth.getAccessToken(options)
- 用授权码换取 access token。
- **参数**：
  - `partner_id` (string/number): 合作方ID
  - `partner_key` (string): 合作方密钥
  - `code` (string): 授权码
  - `main_account_id` (string/number, 可选): 主账号ID
- **返回**：Promise<{ success, data, request, response }>

#### ShopeeAuth.refreshAccessToken(options)
- 用 refresh token 刷新 access token。
- **参数**：
  - `partner_id` (string/number): 合作方ID
  - `partner_key` (string): 合作方密钥
  - `refresh_token` (string): 刷新令牌
  - `shop_id` (string/number, 可选): 店铺ID
  - `merchant_id` (string/number, 可选): 商家ID
- **返回**：Promise<{ success, data, request, response }>

---

### 2. TiktokAuth

#### TiktokAuth.getAccessToken(options)
- 用授权码换取 access token。
- **参数**：
  - `app_key` (string): 应用 App Key
  - `app_secret` (string): 应用 App Secret
  - `auth_code` (string): 授权码
- **返回**：Promise<{ success, data, request, response }>

#### TiktokAuth.refreshAccessToken(options)
- 用 refresh token 刷新 access token。
- **参数**：
  - `app_key` (string): 应用 App Key
  - `app_secret` (string): 应用 App Secret
  - `refresh_token` (string): 刷新令牌
- **返回**：Promise<{ success, data, request, response }>

---

### 3. LazadaAuth

#### LazadaAuth.getAuthUrl(options)
- 生成 Lazada 平台授权链接。
- **参数**：
  - `app_key` (string): Lazada App Key
  - `redirect_uri` (string): 回调地址
- **返回**：string 授权链接

#### LazadaAuth.getAccessToken(options)
- 用授权码换取 access token。
- **参数**：
  - `app_key` (string): Lazada App Key
  - `app_secret` (string): Lazada App Secret
  - `code` (string): 授权码
- **返回**：Promise<{ success, data, request, response }>

#### LazadaAuth.refreshAccessToken(options)
- 用 refresh token 刷新 access token。
- **参数**：
  - `app_key` (string): Lazada App Key
  - `app_secret` (string): Lazada App Secret
  - `refresh_token` (string): 刷新令牌
- **返回**：Promise<{ success, data, request, response }>

---

### 4. autoAuth

#### autoAuth(options)
- 多平台自动定时刷新 token，支持重试、日志、报警。
- **参数**：
  - `platforms` (Array): 平台配置数组，每项：
    - `name` (string): 平台名称
    - `fn` (Function): 刷新 token 的函数（如 ShopeeAuth.refreshAccessToken）
    - `cron` (string): 定时任务 cron 表达式
    - `getParams` (Function, 可选): 动态获取参数的函数，返回 Promise/对象
    - `onSuccess` (Function, 可选): 刷新成功回调
    - `onError` (Function, 可选): 刷新失败回调
  - `retry` (number, 可选): 失败重试次数，默认 3
  - `logger` (Object, 可选): 日志对象，需有 info/error 方法
  - `alarm` (Function, 可选): 报警函数，失败多次后调用
- **返回**：无（自动调度）

---

## 返回结构说明

所有异步接口（除 getAuthUrl）返回 Promise，resolve 时结构如下：

```js
{
  success: true,
  data: <平台原始返回数据>,
  request: { url, headers, query, body },
  response: { status, headers, responseTime }
}
```

失败时 reject：

```js
{
  success: false,
  error: <错误信息>,
  request: { ... },
  response: { ... }
}
```


## 关于 OAuth2.0 的一些理解
### OAuth2.0 整个授权流程

借鉴一下 Tiktok 这幅图，Shopee 和 Lazada 也是类似的

![Tiktok 授权流程](/assets/flow.svg)


### 为什么需要 code

之前一直有一个疑问，为什么需要用 code 换 access token？为什么不直接返回 access token 或直接使用 code？

基于安全考虑有以下原因：
* 资源所属方授权给第三方时，授权成功跳转时需要用重定向 URL 的方式传递信息，code 作为这个传递的信息，它必须可以暴露给前端，并且在整个网络传输中也是公开的，因此 code 已经不安全了，code 不能作为一个可靠的令牌，为了保证安全 code 的过期时间也非常短
* code 换 access token 可以避免真正的安全令牌 (access token) 被暴露在前端，或者过期时间太短造成麻烦

关于 code 我经常能联想到 HTTPS 非对称加密公钥和对称加密串:
* code 可以类比服务器公钥（公开，单次使用）
* access token 可以类比最终的对称加密串（可靠安全，只有双方知道，多次使用）

(顺便回忆一下 HTTPS 过程: [TCP 三次握手和 TLS 握手](https://github.com/freedomcly/blog/blob/master/articles/%E7%AB%AF%E5%88%B0%E7%AB%AF/TCP%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E5%92%8CTLS%E6%8F%A1%E6%89%8B.md))


### sign 是什么，为什么需要 sign

sign 中包含：id，密钥，timestamp，path，参数。可以把 sign 理解为：数字签名或带密钥的指纹。

sign 的本质作用是：
* 保证请求的完整性（未被篡改）
* 保证请求的真实性（未被伪造）
* 保证请求的时效性（防止重放）
* 保障平台和开发者双方的安全

关于 sign 为经常能联想到 HTTPS 中的数字签名。
* Oauth2 sign 是 id，timestamp，path，参数，通过 hash 算法生成摘要，再通过密钥加密得到的字符串。
* HTTPS sign 是网站公钥和网站信息用 hash 算法生成摘要，用证书中心的私钥加密，生成数字签名字符串。


### sign 是怎样生成的

参考 /core/crypto.js 文件


### OAuth2.0 和 HTTPS 的相似性

两者都涉及到三方之间建立信任，因此 OAuth2.0 协议一定是某种程度上借鉴了 HTTPS 协议。

| **OAuth2.0** | **HTTPS** | **相似点** | **角色** |
| :--- | :--- | :--- | :--- |
| code | 公钥 | 公开，单次使用 | 公开交换凭证 |
| access token | 对称加密串 | 可靠安全，只有双方知道，多次使用 | 安全通信凭证 |
| sign | 数字签名 | 防篡改，防伪造 | 防篡改凭证 |
| client secret | 网站私钥 | 完全私密 | 签名凭证 |


## 参考资料

* [OAuth 2.0 协议](https://oauth.net/2/)
* [Shopee 开放平台](https://open.shopee.com/)
* [Tiktok Partner Center](https://partner.tiktokshop.com/)


## 许可证

ISC License
