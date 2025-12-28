import { type Locator, type Page } from '@playwright/test';

export default class CartPage {
  readonly page: Page;
  readonly popupCloseButton: Locator;



  constructor(page: Page) {
    this.page = page;
    this.popupCloseButton = page.getByTestId('dialog-close-button');
  }

  getItemLocator(flavorName: string, specName: string): Locator {
    return this.page.getByText(`${specName} | ${flavorName}`);
  }

  async closePopUp() {
    if (await this.popupCloseButton.isVisible()) {
    await this.popupCloseButton.click();
    }
  }

}

