# E2E Test Case 設計說明
以下會說明『登入』和『加入購物車』的設計脈絡
- 登入：
    - Setup：透過email登入，由於需要手動輸入驗證碼，因此有增加了timeout時間。登入成功後透過`storageState`將登入狀態儲存。
    - E2E-001：驗證在登入後，去到會員頁面，有正確出現會員ID的字樣
      - 會將『會員的ID編號』當作有無登入成功的標準，是因為看了一下登入前後的狀態，只有`my-account`這個頁面有明顯的差別。
      - 當中會跟我註冊的測試用帳號有關聯的，用戶ID會是一個比較方便來判斷『到底對不對』的東西。
- 登入失敗：
    - E2E-002：輸入錯誤手機號碼，會顯示錯誤訊息
    - E2E-003：輸入錯誤手機驗證碼，會顯示錯誤訊息
    - E2E-004：輸入錯誤Email，會顯示錯誤訊息
    - E2E-005：

- 加入購物車：
    - E2E-006：將一個商品加入購物車之後，去到購物車頁面，有正確顯示商品。
      - 由於有出現加購的彈窗，因此有在購物車的`test.beforeEach`加了一個`Handler`，用於關閉在流程當中的彈窗。
    - E2E-007：將兩個不同的商品加入購物車之後，去到購物車頁面，購物車有正確顯示兩個商品。






# API 分析：
### 購物車相關流程：

1.進入某個商品頁面時，前端要顯示的產品資訊會由這隻API回傳:

- **Endpoint**  
  `GET https://www.dogcatstar.com/dni/mu/product/page`

- **Query Parameters**
  | 參數名稱 | 說明 |
  |--------|------|
  | country_code | 國家代碼（例如：TW） |
  | product_id | 商品 ID |

- **Headers**
  - 透過 `x-platform-token` 帶上使用者token

- **使用情境**
  - 商品頁初次載入
  - 使用者切換不同商品時
  - 從其他分頁切換回來時


2.選好商品後，按下加入購物車，會透過這隻graphql同步購物車的狀態：

- **Endpoint**  
  `POST https://fortune-api.moneynet.tw/api/ec/v2/TW/cart/calculate`

- **Payload**
  - 目前購物車內的物品，加上新的要放入購物車內的東西
  - 其他還有包括地址、發票、優惠券、付款方式等等

- **Headers**
  - 透過 `x-platform-token` 帶上使用者token

- **使用情境**
  - 加入購物車
  - 去到購物車頁面計算總金額
  - 結帳時紀錄寄送地址、付款資訊等

3.接著能夠透過這隻API得知目前購物車和其他資訊：

- **Endpoint**  
  `GET https://fortune-api.moneynet.tw/api/ec/v2/TW/cart/cart_request_cache`

- **Query Parameters**
  | 參數名稱 | 說明 |
  |--------|------|
  | shouldRequest | 應用程式應該要求使用者許可權 |
  | country_code | 國家代碼（例如：TW） |

- **Headers**
  - 透過 `x-platform-token` 帶上使用者token


4.除此之外這隻API能夠透過產品ID回傳產品資訊：

- **Endpoint**  
  `GET https://fortune-api.moneynet.tw/api/ec/products`

- **Query Parameters**
  | 參數名稱 | 說明 |
  |--------|------|
  | product_ids | 產品ID |
  | country_code | 國家代碼（例如：TW） |
  | project_code | 專案代碼（DCS）|
  | subship_product_ids | 不太確定，可能是贈品？ |

- **Headers**
  - 透過 `x-platform-token` 帶上使用者token


# API測試設計
**前置準備 (Setup):**
- 透過 **Login API** 取得使用者token
- 呼叫 `GET cart_request_cache` 取得目前購物車內的狀態，將回傳內容儲存成變數`currentPayload`
- 呼叫 `GET /dni/mu/product/page?product_id=XXX`，解析 Response，找到要測的口味的 variation_id和 sku


**測試步驟:**
1. 在`currentPayload`當中，加入要測試的產品口味的variation_id和 sku
2. 接著`POST calculate`時帶上`currentPayload`來同步購物車
3. 最後檢查`calculate`回傳結果中的金額和購物車內容



