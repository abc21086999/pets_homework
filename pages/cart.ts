import { expect, type Locator, type Page } from '@playwright/test';

export default class CartPage {
  readonly page: Page;
  readonly popupCloseButton: Locator;
  readonly cartItemRow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.popupCloseButton = page.getByTestId('popup-close-button');
    this.cartItemRow = page.locator('[data-testid*="cart-items-"]');
  }

  getItemLocator(flavorName: string, specName: string): Locator {
    return this.page.getByText(`${specName} | ${flavorName}`);
  }

  async closePopUp() {
    if (await this.popupCloseButton.isVisible()) {
    await this.popupCloseButton.click();
    }
  }

  async clearCart() {
    await this.page.goto('/cart/');
    await this.page.waitForLoadState('domcontentloaded');
    while (await this.cartItemRow.count() > 0) {
      const firstRow = this.cartItemRow.first();
      const removeBtn = firstRow.locator('button').filter({ has: this.page.locator('svg') }).last();
      await removeBtn.click();
      // await expect(firstRow).toBeHidden();
    }};

}

