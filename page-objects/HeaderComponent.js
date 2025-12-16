const { expect } = require("allure-playwright");
// const { ProductDetailsPage } = require("./ProductDetailsPage");


class HeaderComponent {
    constructor(page) {
        this.page = page;

    //Locators 
    this.headerMenuItems = page.locator('.top-menu>li>a');
    this.pageTitle = page.locator('.page-title h1');
    
    }
    
    //Methods / Functions
    // async 
}

module.exports = { HeaderComponent };
       
       
       
       
    //    const category_names = ["Computers", "Electronics", "Apparel & Shoes", "Digital downloads", "Books", "Jewelry", "Gift Cards"];
       