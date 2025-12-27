import {test, expect} from '@playwright/test';
import DogFoodPage from '../pages/dogfood';
import CartPage from '../pages/cart';

test.describe('將物品加入購物車', () => {
    test.beforeEach(async ({page}) => {
        const dogFoodPage = new DogFoodPage(page);
        await dogFoodPage.gotoDogFoodPage();
    });

    test('E2E-006: 選擇物品加入購物車後有出現在購物車', async ({page}) => {
        const dogFoodPage = new DogFoodPage(page);
        const cartPage = new CartPage(page);
        // 選擇包裝並加入購物車
        await dogFoodPage.addToCart();
        // 確認加入成功訊息有出現
        expect(await dogFoodPage.addToCartMessage.isVisible());
        // 點擊購物車圖示前往購物車頁面
        await dogFoodPage.cartIcon.click();
        // 確認購物車內有剛剛加入的商品
        expect(await cartPage.itemInCart.isVisible());
    });
});