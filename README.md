# ecommerce-auth

## 组件接口文档

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
