const { test, expect } = require('@playwright/test');
const { HomePage } = require('../page-objects/HomePage');
const { ProductPage } = require('../page-objects/ProductPage');
const { HeaderComponent } = require('../page-objects/HeaderComponent');
const { toTitleCase  } = require('../utils/helpers');

test('Header Navigation Test', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const headerComponent = new HeaderComponent(page);
    const categoryNames = headerComponent.headerMenuItems;
    await homePage.goto();
    expect(await categoryNames.count()).toBe(7);
    for (let i = 0; i < await categoryNames.count(); i++) {
        await categoryNames.nth(i).click();
        if(!(await productPage.hasCategoryProducts())){
            const subCount = await productPage.subCategoryItems.count();
            for(let j=0; j < subCount; j++){
                await headerComponent.clickOnHeaderSubMenuItemByIndex(i, j);
                await expect(headerComponent.pageTitle).toBeVisible();
                const titleText = await headerComponent.pageTitle.innerText();
                await productPage.assertProductListingPage(productPage,titleText);
                if(j< subCount -1){
                await homePage.goto();
                await categoryNames.nth(i).click();
                }
            }
        }
        else{
            await expect(headerComponent.pageTitle).toBeVisible();
            const titleText = await headerComponent.pageTitle.innerText();
            await productPage.assertProductListingPage(productPage,titleText);
            await homePage.goto();
        }
    }
});
