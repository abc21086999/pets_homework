import {test, expect} from '@playwright/test';
import HomePage from '../pages/homepage';
import LoginPage from '../pages/loginpage';

test.use({ storageState: { cookies: [], origins: []} });

test.describe('會員登入驗證 - 反向流程', () => {
    test.beforeEach(async ({page}) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        await homePage.clickLogin();
    });

    test('E2E-002: 使用者輸入錯誤手機號碼會顯示錯誤訊息', async ({page}) => {
        const loginPage = new LoginPage(page);

        console.log('使用錯誤的手機號碼進行登入');
        await loginPage.phoneLogin('0');
        await expect(loginPage.phoneLoginErrorMessage).toBeVisible();

    });

    test('E2E-003: 使用者輸入錯誤手機驗證碼會顯示錯誤訊息', async ({page}) => {
    const loginPage = new LoginPage(page);

    console.log('使用看似正常的手機號碼進行登入');
    await loginPage.phoneLogin('0900000000');
    await loginPage.verificationInput.fill('000000');
    await expect(loginPage.loginVerificationErrorMessage).toBeVisible();

    });

    test('E2E-004: 使用者輸入錯誤Email會顯示錯誤訊息', async ({page}) => {
    const loginPage = new LoginPage(page);

    console.log('使用錯誤的Email進行登入');
    await loginPage.emailLogin('000');
    await expect(loginPage.emailLoginErrorMessage).toBeVisible();

    });

    test('E2E-005: 使用者輸入錯誤Email驗證碼會顯示錯誤訊息', async ({page}) => {
    const loginPage = new LoginPage(page);

    console.log('使用看似正常的Email進行登入');
    await loginPage.emailLogin('aa.bb@mail.com');
    await loginPage.verificationInput.fill('000000');
    await expect(loginPage.loginVerificationErrorMessage).toBeVisible();

    });
});