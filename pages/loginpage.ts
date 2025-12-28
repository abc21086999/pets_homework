import { type Locator, type Page, expect } from '@playwright/test';

export default class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly verificationInput: Locator;
  readonly emailLoginTab: Locator;
  readonly emailSubmitBtn: Locator;
  readonly phoneSubmitBtn: Locator;
  readonly phoneLoginErrorMessage: Locator;
  readonly emailLoginErrorMessage: Locator;
  readonly loginVerificationErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailLoginTab = page.getByRole('button', { name: '使用 Email 登入' });
    this.emailInput = page.locator('input[name="email"]');
    this.phoneInput = page.locator('input[name="username"]');
    this.verificationInput = page.locator('input[autocomplete="one-time-code"]').first();
    this.emailSubmitBtn = page.getByRole('button', { name: '確認', exact: true });
    this.phoneSubmitBtn = page.getByRole('button', { name: '登入/註冊', exact: true });
    this.phoneLoginErrorMessage = page.getByText('手機號碼格式錯誤');
    this.loginVerificationErrorMessage = page.getByText('驗證碼過期，請重新傳送驗證碼！');
    this.emailLoginErrorMessage = page.getByText('Email 格式錯誤！');


  }

  async emailLogin(email: string) {
    await this.emailLoginTab.click();
    await this.emailInput.fill(email);
    await expect(this.emailSubmitBtn).toBeEnabled();
    await this.emailSubmitBtn.click();
  }

  async phoneLogin(phone: string) {
    await this.phoneInput.fill(phone);
    await expect(this.phoneSubmitBtn).toBeEnabled();
    await this.phoneSubmitBtn.click();
  }
}
