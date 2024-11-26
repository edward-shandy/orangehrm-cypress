/// <reference types="cypress" />
import loginPage from "../../pom/login/login-pom.cy";

describe('login feature', () => {
    beforeEach(() => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })

    //TC-01
    it('Pengguna dapat membuka halaman login', () => {
      cy.get('img[alt="company-branding"]').should('be.visible');
      cy.get('div.orangehrm-login-logo img').should('exist');
      cy.get('h5').should('contain', 'Login');
    })

    //TC-02
    it('Pengguna dapat menginput username', () => {
      loginPage.inputUsername().should('exist').type('Admin');
    })

    //TC-03
    it('Pengguna dapat menginput password', () => {
      cy.get('input[name="password"]').should('exist').type('admin123');
    })

    //TC-04
    it('Pengguna tidak dapat melakukan login tanpa input username', () => {
      loginPage.inputUsername().should('exist').clear().should('have.value', '');
      cy.get('input[name="password"]').should('exist').type('admin123');
      cy.get('button[type="submit"]').click();
      cy.get('span.oxd-input-field-error-message').should('contain','Required');
    })

    //TC-05
    it('Pengguna tidak dapat melakukan login tanpa input password', () => {
      loginPage.inputUsername().should('exist').type('Admin');
      cy.get('input[name="password"]').should('exist').clear().should('have.value', '');
      cy.get('button[type="submit"]').click();
      cy.get('span.oxd-input-field-error-message').should('contain','Required');
    })
    
    //TC-06
    it('Pengguna tidak dapat melakukan login tanpa input username dan password', () => {
      cy.get('button[type="submit"]').should('exist').click();
      cy.get('span.oxd-input-field-error-message').should('contain','Required');
    })

    //TC-07
    it('Pengguna tidak dapat melakukan login dengan username yang salah', () => {
      loginPage.inputUsername().should('exist').type('Admin-test');
      cy.get('input[name="password"]').should('exist').type('admin123');
      cy.get('button[type="submit"]').click();
      cy.get('p.oxd-alert-content-text').should('contain','Invalid credentials');
    })

    //TC-08
    it('Pengguna tidak dapat melakukan login dengan password yang salah', () => {
      loginPage.inputUsername().should('exist').type('Admin');
      cy.get('input[name="password"]').should('exist').type('admin123-test');
      cy.get('button[type="submit"]').click();
      cy.get('p.oxd-alert-content-text').should('contain','Invalid credentials');
    })

    //TC-09
    it('Pengguna tidak dapat melakukan login dengan username dan password yang mengandung spesial karakter', () => {
      loginPage.inputUsername().should('exist').type('@Admin');
      cy.get('input[name="password"]').should('exist').type('@admin123-test');
      cy.get('button[type="submit"]').click();
      cy.get('p.oxd-alert-content-text').should('contain','Invalid credentials');
    })

    //TC-10
    it('Pengguna berhasil melakukan login', () => {
      loginPage.inputUsername().should('exist').type('Admin');
      cy.get('input[name="password"]').should('exist').type('admin123');
      cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary');
      cy.intercept('GET', '**/shortcuts').as('shortcuts');
      cy.intercept('GET', '**/subunit').as('subunit');
      cy.intercept('GET', '**/locations').as('locations');
      cy.intercept('GET', '**/time-at-work*').as('timeAtWork');
      cy.get('button[type="submit"]').click();
      cy.wait('@actionSummary');
      cy.wait('@shortcuts');
      cy.wait('@subunit');
      cy.wait('@locations');
      cy.wait('@timeAtWork');
      cy.get('span.oxd-main-menu-item--name').should('contain','Dashboard');
    })
})