import {test, expect} from '@playwright/test';
import HomePage from '../pages/homepage';
import MemberPage from '../pages/member';

test.describe('會員登入驗證', () => {
    test.beforeEach(async ({page}) => {
        const homePage = new HomePage(page);
        await homePage.goto();
    });

    test('E2E-001: 使用者登入後有顯示會員ID', async ({page}) => {
        const homePage = new HomePage(page);
        const memberPage = new MemberPage(page);

        console.log('前往會員中心');
        await homePage.goToMemberCenter();

        console.log('驗證會員ID是否正確顯示');
        await expect(memberPage.memberID).toBeVisible();

        console.log('會員ID顯示正確，測試通過！');
    });
});