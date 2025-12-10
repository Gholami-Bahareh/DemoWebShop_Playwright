const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../page-objects/ProductPage');
const { ProductDetailsPage } = require('../page-objects/ProductDetailsPage');
const { CartPage } = require('../page-objects/CartPage');



test('product details should be visible for each first product!', async ({ page }) => {
    test.setTimeout(60000);
    const productPage = new ProductPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    await productPage.goto();
    const categoryCount = await productPage.categoryItems.count();
    for(let i=0;i<categoryCount;i++){
    await productPage.clickOnFirstProductFromCategory(i);
    await productDetailsPage.validateProductDetails()
    await productPage.goto();
}
})

test('should add first product from product detail page to cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    await productPage.goto();
    await productPage.clickOnFirstProductFromCategory(0);
    await productDetailsPage.addToCartFromDetailsPage();
})

test.only('should add N items to cart and validate subtotal', async ({ page }) => {
    const N = 3;
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    await productPage.goto();
    const cartCountBefore = await productDetailsPage.getCartCount();
    await productPage.clickOnFirstProductFromCategory(0);
    const price = await productDetailsPage.getProductPrice();
    await productDetailsPage.addMoreThanOneitemsToCart(N);
    await expect(productDetailsPage.notificationBar).toBeVisible();
    await expect(productDetailsPage.cartQtyText).toHaveText(`(${cartCountBefore + N})`);
    
    await cartPage.goto();
    const subTotal = await cartPage.getSubTotalPrice();
    console.log(subTotal);
    await expect(subTotal).toBe(price * N);

})

