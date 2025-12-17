const { test, expect } = require('@playwright/test');
const { HomePage } = require('../page-objects/HomePage');
const { ProductPage } = require('../page-objects/ProductPage');
const { HeaderComponent } = require('../page-objects/HeaderComponent');
const { toTitleCase  } = require('../utils/helpers');

test.only('Header Navigation Test', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const headerComponent = new HeaderComponent(page);
    const categoryNames = headerComponent.headerMenuItems;
    await homePage.goto();
    expect(await categoryNames.count()).toBe(7);
    for (let i = 0; i < await categoryNames.count(); i++) {
        await categoryNames.nth(i).click();
        if(!(await productPage.hasCategoryProducts())){
            for(let j=0; j < await productPage.subCategoryItems.count(); j++){
                
                await headerComponent.clickOnHeaderSubMenuItemByIndex(i, j);
                await expect(headerComponent.pageTitle).toBeVisible();
        await expect(productPage.productSorting).toBeVisible();
        await expect(productPage.productViewMode).toBeVisible();
        await expect(productPage.productsPageSize).toBeVisible();
        await expect(productPage.breadcrumb).toBeVisible();
        const titleText1 = await headerComponent.pageTitle.innerText();
        await expect(productPage.breadcrumbCurrentItem).toHaveText(titleText1);
        await homePage.goto();
        await categoryNames.nth(i).click();

        }}
        else{
        await expect(headerComponent.pageTitle).toBeVisible();
        await expect(productPage.productSorting).toBeVisible();
        await expect(productPage.productViewMode).toBeVisible();
        await expect(productPage.productsPageSize).toBeVisible();
        await expect(productPage.breadcrumb).toBeVisible();
        const titleText = await headerComponent.pageTitle.innerText();
        await expect(productPage.breadcrumbCurrentItem).toHaveText(titleText);

        // await expect(headerComponent.pageTitle).toContainText(await toTitleCase(titleText));
        //One of menu names and page titles dont follow the above rule! ("Digital downloads" vs "Digital Downloads")
        await homePage.goto();}
    }   

});
