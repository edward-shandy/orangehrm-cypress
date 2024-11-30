export default class forgotPassword {
    static companyBranding(){
        return cy.get('img[alt="company-branding"]');
    }

    static orangeLogo(){
        return cy.get('div.orangehrm-login-logo img');
    }

    static copytextLogin(){
        return cy.get('h5');
    }

    static forgotYourPasswordCTA(){
        return cy.get('p.orangehrm-login-forgot-header');
    }

    static copytextResetPassword(){
        return cy.get('h6');
    }

    static cancelButton(){
        return cy.get('button.orangehrm-forgot-password-button--cancel');
    }

    static resetPasswordButton(){
        return cy.get('button.orangehrm-forgot-password-button--reset');
    }

    static errorMessageRequired(){
        return cy.get('span.oxd-input-field-error-message');
    }

    static inputUsername(){
        return cy.get('input[name="username"]');
    }
}