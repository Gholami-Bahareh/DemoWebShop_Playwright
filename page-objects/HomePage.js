class HomePage {
    constructor(page) {
        this.page = page;

        //Locators
        this.logoutLink = page.locator('a[href="/logout"]');
        

    }
};

module.exports = { HomePage };