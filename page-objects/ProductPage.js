class ProductPage {
    constructor(page) {
        this.page = page;

    //Locators
    this.categoryMenu = page.locator('.block.block-category-navigation');
    this.categoryItems = page.locator('.block.block-category-navigation li a');
    this.subCategoryItems = page.locator('.block.block-category-navigation li.active li a');
    this.productItems = page.locator('.product-grid .item-box');
    this.productPicture = page.locator('.product-grid .picture');
    this.productTile = page.locator('.product-grid .details .product-title a');
    this.productRating = page.locator('.product-grid .product-rating-box');
    this.productPrice = page.locator('.product-grid .prices');

    }
    
    //Methods / Functions
    async goto(){
        await this.page.goto();
    }

    async openFirstCategory() {
        await this.categoryItems.first().click();
    }

    

    }

module.exports = { ProductPage };