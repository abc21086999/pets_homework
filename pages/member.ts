import { type Locator, type Page } from '@playwright/test';

export default class MemberPage {
  readonly page: Page;
  readonly memberID: Locator;

  constructor(page: Page) {
    this.page = page;
    this.memberID = page.getByText('#379225'); 
  }
}

