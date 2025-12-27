import { type Locator, type Page } from '@playwright/test';

export default class HomePage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly memberIcon: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginButton = page.getByTitle("我的帳號");
    this.memberIcon = page.getByRole('link', { name: 'User' }); 
  }

  async goto() {
    await this.page.goto('/');
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async goToMemberCenter() {
  await this.memberIcon.click();
  }
}

