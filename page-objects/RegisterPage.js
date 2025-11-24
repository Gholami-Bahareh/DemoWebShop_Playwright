class RegisterPage {
    constructor(page) {
        this.page = page;

        //Locators
        this.genderMaleRadio = page.locator('#gender-male');
        this.genderFemaleRadio = page.locator('#gender-female');
        this.firstnameInput = page.locator('#FirstName');
        this.lastnameInput = page.locator('#LastName');
        this.emailInput = page.locator('#Email');
        this.passwordInput = page.locator('#Password');
        this.confirmPasswordInput = page.locator('#ConfirmPassword');
        this.registerButton = page.locator('#register-button');
        
    }
    
     //Methods / Functions
    async register(firstname, lastname, email,password,){
        await this.genderMaleRadio.check();
        await this.firstnameInput.fill(firstname);
        await this.lastnameInput.fill(lastname);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        await this.registerButton.click();
    }
};


module.exports = { RegisterPage };