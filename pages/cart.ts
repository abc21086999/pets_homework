import { type Locator, type Page } from '@playwright/test';

export default class CartPage {
  readonly page: Page;
  readonly popupCloseButton: Locator;
  readonly itemInCart: Locator;


  constructor(page: Page) {
    this.page = page;
    const packageString = '單包 150g';
    const flavorString = '強壯雞腿餐';
    this.itemInCart = page.getByText(`${packageString}|${flavorString}`);
    this.popupCloseButton = page.getByTestId('dialog-close-button');
  }

  async closePopUp() {
    if (await this.popupCloseButton.isVisible()) {
    await this.popupCloseButton.click();
    }
  }

}

