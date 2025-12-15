class HomePage {
    constructor(page) {
        this.page = page;

        //Locators
        this.logoutLink = page.locator('a[href="/logout"]');
        this.accountLink = page.locator('div[class="header-links"] a[href="/customer/info"]');
        this.loginLink = page.locator('a[href="/login"]');
        this.shoppingCartLink = page.locator('.ico-cart .cart-label');
        this.minishoppingcartLink = page.locator('.mini-shopping-cart');
        this.minishoppingcartcontent = page.locator('.mini-shopping-cart .count')
        

    }
    //Methods / Functions
    async logOut(){
        await this.logoutLink.click();
    }

    async goto(){
        await this.page.goto('/');
    }   

    async hoverOverCart() {
        await this.shoppingCartLink.hover();
    } 
};

module.exports = { HomePage };