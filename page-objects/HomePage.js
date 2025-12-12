class HomePage {
    constructor(page) {
        this.page = page;

        //Locators
        this.logoutLink = page.locator('a[href="/logout"]');
        this.accountLink = page.locator('div[class="header-links"] a[href="/customer/info"]');
        this.loginLink = page.locator('a[href="/login"]');
        

    }
    //Methods / Functions
    async logOut(){
        await this.logoutLink.click();
    }
};

module.exports = { HomePage };