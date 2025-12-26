import { test as setup, expect } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';
import { LoginPage } from '../pages/loginpage';
import { HomePage } from '../pages/homepage';

setup('authenticate with manual OTP', async ({ page }) => {
  // 設定超長 Timeout (例如 5 分鐘)，給你足夠時間收信、輸入驗證碼
  setup.setTimeout(120000); 

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  console.log('1. 前往首頁');
  await homePage.goto();
  await homePage.clickLogin();

  console.log('2. 輸入 Email (請確認你的測試帳號不需要密碼，或是接下來要手動輸)...');
  // 假設你的 loginPage.login 只有填 email 和點擊送出
  // 如果流程是：填 Email -> 按下一步 -> 出現驗證碼框
  await loginPage.login('abc21086999@gmail.com');
  await loginPage.verificationInput.click(); 

  // -----------------------------------------------------
  //          這裡開始進入「手動介入區」
  // -----------------------------------------------------
  console.log('⚠️⚠️⚠️ 請注意！');
  console.log('現在瀏覽器應該已經跳出驗證碼輸入框。');
  console.log('請在瀏覽器視窗中「手動輸入」你收到的驗證碼，並按下登入。');
  console.log('程式正在等待網頁跳轉回首頁 (或偵測到登入成功的標誌)...');

  await page.waitForURL(/.*dogcatstar\.com.*no-cache.*/, { timeout: 0 })
  // 上面這行意思是：給你 120 秒的時間手動操作，直到程式看到「登出按鈕」出現為止

  // -----------------------------------------------------
  //          手動介入結束，程式接手
  // -----------------------------------------------------
  
  console.log('3. 偵測到登入成功！等待狀態穩定...');
  await page.waitForLoadState('domcontentloaded');

  // 存檔
  await page.context().storageState({ path: STORAGE_STATE });
  console.log('✅ Auth 檔案已儲存，後續測試將自動略過登入步驟。');
});