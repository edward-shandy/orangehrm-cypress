export default class directoryPage {
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

    static dashboardMenu(){
        return cy.get('li:nth-child(8) span.oxd-text.oxd-text--span.oxd-main-menu-item--name');
    }

    static directoryMenu(){
        return cy.get('li:nth-child(9) span.oxd-text.oxd-text--span.oxd-main-menu-item--name');
    }

    static copytextDirectory(){
        return cy.get('h5.oxd-table-filter-title');
    }

    static inputNameEmployee(){
        return cy.get('input[placeholder="Type for hints..."]');
    }

    static employeeOption(){
        return cy.get('div.oxd-autocomplete-option');
    }

    static jobTitleDropdown(){
        return cy.get('div.oxd-grid-item--gutters:nth-of-type(2) i.oxd-select-text--arrow');
    }

    static cfoOption(){
        return cy.get('div[class="oxd-table-filter"] div:nth-child(5)');
    }

    static locationDropdown(){
        return cy.get('div.oxd-grid-item--gutters:nth-of-type(3) i.oxd-select-text--arrow');
    }

    static newYorkOption(){
        return cy.get('div[role="listbox"] div:nth-child(4)');
    }

    static searchButton(){
        return cy.get('button[type="submit"]');
    }

    static employeeCard(){
        return cy.get('p.orangehrm-directory-card-header');
    }

    static employeeCardDetails(){
        return cy.get('div.orangehrm-corporate-directory-sidebar');
    }

    static resetButton(){
        return cy.get('button[type="reset"]');
    }
}