import { type Locator, type Page } from '@playwright/test';

export default class DogFoodPage {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly addToCartButton: Locator;
  readonly addToCartMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.getByTestId('button-go-to-cart').nth(1);
    this.addToCartButton = page.getByTestId('button-add-to-cart');
    this.addToCartMessage = page.getByText('已成功加入購物車');
  }

  async gotoDogFoodPage() {
    await this.page.goto('/product/dogfreshfood/');
  }

  async gotoCartPage() {
    await this.cartIcon.click();
  }

  async addToCart(flavorName: string, specName: string) {
    const flavorLocator = this.page.getByRole('button', { name: flavorName });
    const specLocator = this.page.getByRole('button', { name: specName });
    await flavorLocator.click();
    await this.addToCartButton.click();
  }

}

