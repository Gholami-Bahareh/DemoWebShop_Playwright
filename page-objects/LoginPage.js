// Class definition
class LoginPage {
    constructor(page) {
        this.page = page;

    //Locators
        this.emailInput = page.locator('#Email');
        this.passwordInput = page.locator('#Password');
        this.loginButton = page.locator('.button-1.login-button');
        this.errorMessage = page.locator('.validation-summary-errors');
        this.rememberMeCheckbox = page.locator('#RememberMe');
        this.forgotPasswordLink = page.locator('a[href="/passwordrecovery"]');
        this.registerButton = page.locator('.button-1.register-button'); 
        this.invalidEmailMessage = page.locator('[data-valmsg-for="Email"]');


        // this.<locatorname> = page.locator (<locator CSS>) ;
  }

    //Methods / Functions
    async goto(){
        await this.page.goto('/login');
    }
    async login(email,password){
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    
}

module.exports = { LoginPage };