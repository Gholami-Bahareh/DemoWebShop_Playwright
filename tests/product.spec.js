const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../page-objects/ProductPage');


test('UI element should be visible', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.goto();

    await productPage.openFirstCategory();
    if (await productPage.hasProducts()){

        await expect(productPage.productItems).not.toHaveCount(0);
        await productPage.validateFirstProduct();
    }
    else{
        await productPage.openFirstSubCategory();
        await expect(productPage.productItems).not.toHaveCount(0);
        await productPage.validateFirstProduct();

    }
});

test('products in different categories should not match', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.goto();
    const firstProductTitle = await productPage.getFirstProductTitleFromCategory(0);
    const firstProductURL = page.url();

    const secondProductTitle = await productPage.getFirstProductTitleFromCategory(1);
    const secondProductURL = page.url();
    await expect(firstProductTitle).not.toBe(secondProductTitle);
    await expect(firstProductURL).not.toBe(secondProductURL);

});

test('should add first product from category to cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.goto();
    await productPage.openFirstCategory();
    if (await productPage.hasProducts()){
        await productPage.addFirstProductToCart();
    }
    else{
        await productPage.openFirstSubCategory();
        await productPage.addFirstProductToCart();
    } 
});

test('sort_by_dropdown_ui_behavior', async ({ page }) => {
    const productPage = new ProductPage(page);
    //options: 0: Position, 1: Name: A to Z, 2: Name: Z to A, 3: Price: Low to High, 4: Price: High to Low, 5: Created on
    //0: Position is defaut and is the same as 1: Name: A to Z, So we will test from 2 to 5
    for (let i=2; i<6; i++){
    await productPage.goto();
    const productListPage = await productPage.openRandomProductlistContainingMin2items();

    await expect(await productListPage.hasCategoryProducts()).toBeTruthy();
    await expect(productListPage.productSorting).toBeVisible();

    // const productNameListBeforeSort = await productListPage.productNameList();
    const productCountBeforeSort = await productListPage.productItems.count();
    const pageURLBeforeSort = page.url();

    await productListPage.sortingBy(i);
    // Wait for UI update
    await expect(productListPage.productItems.first()).toBeVisible();

    // const productNameListAfterSort = await productListPage.productNameList();
    const productCountAfterSort = await productPage.productItems.count();
    const pageURLAfterSort = page.url();
    const sortByOptionText = await productListPage.getSortByDropdownOptionsText(i);
    const selectedOptionText = await productListPage.sortByDropdownSelectedOption.innerText();

    await expect(selectedOptionText).toEqual(sortByOptionText); 
    await expect(productCountAfterSort).toEqual(productCountBeforeSort);
    // All sort options trigger navigation and update URL in this application
    await expect(pageURLAfterSort).not.toEqual(pageURLBeforeSort);

    // if (JSON.stringify(productNameListBeforeSort) !== JSON.stringify(productNameListAfterSort)) {
    //     await expect(productNameListAfterSort).not.toEqual(productNameListBeforeSort);}
    //     else {
    //         console.warn(
    //             'Sort option selected. Product order before and after appears identical. ' +
    //             'This may be due to matching default order or an undetected UI issue.');
    //     }    
        // await expect(productNameListAfterSort).not.toEqual(productNameListBeforeSort);
    
    }

});

test.only('productsPageSize_ui_behavior', async ({ page }) => {
    const productPage = new ProductPage(page);
    const productPageListing = await productPage.openRandomProductlistContaining8itemsAndPaging();
    const pageURLBeforeSort = page.url();

    await productPageListing.chooseItemsPerPage(0); // 4 items per page

    // Wait for UI update
    await expect(productPageListing.productItems.first()).toBeVisible();

    await expect(await productPageListing.getItemPerPageOptionText(0)).toContain('4'); // verify selected option is 4 items per page
    await expect(await productPageListing.productItems.count()).toBeLessThanOrEqual(4);
    const pageURLAfterFirstChange = page.url();
    await expect(pageURLAfterFirstChange).not.toEqual(pageURLBeforeSort);


    await productPageListing.chooseItemsPerPage(2); // 12 items per page

    // Wait for UI update
    await expect(productPageListing.productItems.first()).toBeVisible();
    
    await expect(await productPageListing.getItemPerPageOptionText(2)).toContain('12'); // verify selected option is 12 items per page
    await expect(await productPageListing.productItems.count()).toBeLessThanOrEqual(12);
    await expect(await productPageListing.productItems.count()).toBeGreaterThan(8);
    const pageURLAfterSecondChange = page.url();
    await expect(pageURLAfterSecondChange).not.toEqual(pageURLBeforeSort);
    await expect(pageURLAfterSecondChange).not.toEqual(pageURLAfterFirstChange);
    
});