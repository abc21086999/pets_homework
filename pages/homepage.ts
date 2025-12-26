import { type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginButton = page.getByTitle("我的帳號"); 
  }

  async goto() {
    await this.page.goto('/');
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}

export default HomePage;
