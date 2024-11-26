export default class loginPage {
    static companyBranding(){
        return cy.get('img[alt="company-branding"]');
    }

    static orangeLogo(){
        return cy.get('div.orangehrm-login-logo img');
    }

    static copytextLogin(){
        return cy.get('h5');
    }

    static inputUsername(){
        return cy.get('input[name="username"]');
    }

    static inputPassword(){
        return cy.get('input[name="password"]');
    }

    static submitButton(){
        return cy.get('button[type="submit"]');
    }

    static errorMessageRequired(){
        return cy.get('span.oxd-input-field-error-message');
    }

    static alertInvalidCredential(){
        return cy.get('p.oxd-alert-content-text');
    }

    static dashboardMenu(){
        return cy.get('span.oxd-main-menu-item--name');
    }
}