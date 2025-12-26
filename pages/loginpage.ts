import { type Locator, type Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly verificationInput: Locator;
  readonly emailLogin: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailLogin = page.getByRole('button', { name: '使用 Email 登入' });
    this.emailInput = page.locator('input[name="email"]');
    this.verificationInput = page.locator('input[autocomplete="one-time-code"]').first();
    this.submitBtn = page.getByRole('button', { name: '確認', exact: true });
  }

  async login(email: string) {
    await this.emailLogin.click();
    await this.emailInput.fill(email);
    await expect(this.submitBtn).toBeEnabled();
    await this.submitBtn.click();
    // await this.verificationInput.fill(pass);
  }
}

export default LoginPage;
