import { expect } from '@playwright/test';
export class products{
    constructor(page){
        this.page=page;
    }
    async productsPage () {
        await this.page.goto('https://www.saucedemo.com/')
        await this.page.fill('#user-name','standard_user');
        await this.page.fill('#password','secret_sauce');
        await this.page.click('#login-button');
        const image= this.page.locator('[data-test="inventory-item-sauce-labs-backpack-img"]');
        await image.waitFor({state: 'visible'});
        await image.click();
        await this.page.click('#add-to-cart');
        await this.page.click('#back-to-products');
        await this.page.click('//div[text()="Sauce Labs Bike Light"]');
        await this.page.click('#add-to-cart');
        await this.page.click('#back-to-products');
        await this.page.click('#add-to-cart-sauce-labs-bolt-t-shirt');
        
    }
    async viewCart(){
    await this.page.click('a[class="shopping_cart_link"]');
    const viewItems = this.page.locator('//div[@class="cart_list"]');
    await expect (viewItems).toBeVisible(); 
    const Items = this.page.locator('//div[@class="cart_item"]');
    await expect(Items).toHaveCount(3);
    }
}