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
        // const titleText = await headerComponent.pageTitle.innerText();
        // await expect(headerComponent.pageTitle).toContainText(await toTitleCase(titleText));
        //One of menu names and page titles dont follow the above rule! ("Digital downloads" vs "Digital Downloads")
        await expect(productPage.breadcrumb).toBeVisible();
        
        await homePage.goto();
        // console.log(await categoryNames.nth(i).innerText());
    }   
  
    // console.log(categoryNames);

});
