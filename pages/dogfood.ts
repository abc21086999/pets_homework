import { type Locator, type Page } from '@playwright/test';

export default class DogFoodPage {
  readonly page: Page;
  readonly package: Locator;
  readonly flavor: Locator;
  readonly cartIcon: Locator;
  readonly addToCartButton: Locator;
  readonly addToCartMessage: Locator;

  constructor(page: Page) {
    const packageString = '單包 150g';
    const flavorString = '強壯雞腿餐';
    this.page = page;
    this.package = page.getByRole('button', { name: `${packageString}` });
    this.flavor = page.getByText(flavorString);
    this.cartIcon = page.getByTestId('button-go-to-cart').nth(1);
    this.addToCartButton = page.getByTestId('button-add-to-cart');
    this.addToCartMessage = page.getByText('已成功加入購物車');
  }

  async gotoDogFoodPage() {
    await this.page.goto('/product/dogfreshfood/');
  }

  async addToCart() {
    await this.package.click();
    await this.addToCartButton.click();
  }
}

