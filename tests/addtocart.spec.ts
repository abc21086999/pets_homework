import {test, expect} from '@playwright/test';
import DogFoodPage from '../pages/dogfood';
import CartPage from '../pages/cart';

// 讓測試一個一個跑，不要同時跑互相影響
test.describe.configure({ mode: 'serial' });

test.describe('將物品加入購物車', () => {
    let cartPage: CartPage;
    let dogFoodPage: DogFoodPage;
    const TEST_ITEM = { 
        flavorChicken: '強壯雞腿餐',
        flavorLamb: '閃亮羊腿餐',
        spec: '單包 150g',
    };

    test.beforeEach(async ({page}) => {
        dogFoodPage = new DogFoodPage(page);
        cartPage = new CartPage(page);
        await cartPage.clearCart();
        await dogFoodPage.gotoDogFoodPage();

        await page.addLocatorHandler(cartPage.popupCloseButton, async () => {
            await cartPage.popupCloseButton.click();
        });
    });

    test('E2E-006: 選擇物品加入購物車後有出現在購物車', async ({page}) => {     
        // 選擇包裝並加入購物車
        await dogFoodPage.addToCart(TEST_ITEM.flavorChicken, TEST_ITEM.spec);
        // 確認加入成功訊息有出現
        await expect(dogFoodPage.addToCartMessage).toBeVisible();
        // 點擊購物車圖示前往購物車頁面
        await dogFoodPage.gotoCartPage();
        // 確認購物車內有剛剛加入的商品
        await expect(cartPage.getItemLocator(TEST_ITEM.flavorChicken, TEST_ITEM.spec)).toBeVisible();
    });

    test('E2E-007: 加入多種物品到購物車後，購物車內有正確的物品清單', async ({page}) => {
        // 選擇不同的口味並加入購物車
        await dogFoodPage.addToCart(TEST_ITEM.flavorChicken, TEST_ITEM.spec);
        await dogFoodPage.addToCart(TEST_ITEM.flavorLamb, TEST_ITEM.spec);
        // 點擊購物車圖示前往購物車頁面
        await dogFoodPage.gotoCartPage();
        // 確認購物車內有剛剛加入的商品
        await expect(cartPage.getItemLocator(TEST_ITEM.flavorChicken, TEST_ITEM.spec)).toBeVisible();
        await expect(cartPage.getItemLocator(TEST_ITEM.flavorLamb, TEST_ITEM.spec)).toBeVisible();
    });

    test('E2E-008: 重複加入相同物品到購物車後，購物車內有正確物品數量', async ({page}) => {
        // 選擇不同的口味並加入購物車
        await dogFoodPage.addToCart(TEST_ITEM.flavorChicken, TEST_ITEM.spec);
        await dogFoodPage.addToCart(TEST_ITEM.flavorLamb, TEST_ITEM.spec);
        // 點擊購物車圖示前往購物車頁面
        await dogFoodPage.gotoCartPage();
        // 確認購物車內有剛剛加入的商品
        await expect(cartPage.getItemLocator(TEST_ITEM.flavorChicken, TEST_ITEM.spec)).toBeVisible();
        await expect(cartPage.getItemLocator(TEST_ITEM.flavorLamb, TEST_ITEM.spec)).toBeVisible();
    });


});