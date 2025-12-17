const { expect } = require("allure-playwright");
// const { ProductDetailsPage } = require("./ProductDetailsPage");


class HeaderComponent {
    constructor(page) {
        this.page = page;

    //Locators 
    this.headerMenuItems = page.locator('.top-menu>li>a');
    this.headerSubMenuItems = page.locator('.top-menu > li:nth-child(i) > ul> li > a');
    this.pageTitle = page.locator('.page-title h1');
    
    }
    
    //Methods / Functions
    
    async clickOnHeaderSubMenuItemByIndex(parentIndex, subIndex) {
        return this.page.locator('.top-menu > li')
        .nth(parentIndex)
        .locator('ul > li > a')
        .nth(subIndex)
        .click();
    }


}
module.exports = { HeaderComponent };
