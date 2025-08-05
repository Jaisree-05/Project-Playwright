import { test, expect } from '@playwright/test';
import { products} from '../addCart';
;
//all the users name
const users = [{ username: 'standard_user', expectedUrl: /inventory/, expectError: false },
{ username: 'locked_out_user', errorMsg: 'Sorry, this user has been locked out.', expectError: true },
{ username: 'problem_user', expectedUrl: /inventory/, expectError: false },
{ username: 'performance_glitch_user', expectedUrl: /inventory/, expectError: false },
{ username: 'error_user', expectedUrl: /inventory/, expectError: false },
{ username: 'visual_user', expectedUrl: /inventory/, expectError: false },
{ username: 'riyas', errorMsg: 'Epic sadface: Username and password do not match any user in this service', expectError: true }
];
const password = 'secret_sauce';
for (const user of users) {
    test(`Login test with ${user.username}`, async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', user.username);
        await page.fill('#password', password);
        await page.click('#login-button');
        //to check all the login credintals
        if (user.expectError) {
            const errorMsg = page.locator('[data-test="error"]')
            await expect(errorMsg).toContainText(user.errorMsg);
        }
        else {
            await expect(page).toHaveURL(user.expectedUrl);
        }
        await page.goto('https://www.saucedemo.com/inventory/');

    });
}
test('Add to cart the products', async ({ page }) => {
   const addItems= new products(page);
   await addItems.productsPage();
   await addItems.viewCart();
   await page.click('#checkout');
})