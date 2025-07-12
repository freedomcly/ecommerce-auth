import { ShopeeAuth } from "../index.js";
import config from "../configs/index.js";

describe("ShopeeAuth", () => {
  test("getAuthUrl", () => {
    const url = ShopeeAuth.getAuthUrl({
      partner_id: config.apis.shopee.partnerId,
      redirect: "http://baidu.com:8080",
      main_account_id: config.apis.shopee.mainAccountId,
      partner_key: config.apis.shopee.partnerKey,
    });
    console.log("getAuthUrl", url);
    expect(url).toMatch(/^https:\/\/.+/);
  });
  test("getAccessToken", () => {
    const options = {
      partner_id: config.apis.shopee.partnerId,
      partner_key: config.apis.shopee.partnerKey,
      code: "",
      main_account_id: config.apis.shopee.mainAccountId,
    };
    return ShopeeAuth.getAccessToken(options).then((response) => {
      expect(response).toHaveProperty("access_token");
    });
  });
  test("refreshAccessToken", () => {
    const options = {
      partner_id: config.apis.shopee.partnerId,
      partner_key: config.apis.shopee.partnerKey,
      refresh_token: "",
      shop_id: 12345678,
    };
    return ShopeeAuth.refreshAccessToken(options).then((response) => {
      expect(response).toHaveProperty("access_token");
    });
  });
});
