/// <reference types="cypress" />
import loginPage from "../../pom/login-pom.cy";
import forgotPassword from "../../pom/forgotpass-pom.cy";
import directoryPage from "../../pom/directory-pom.cy";

describe('login feature', () => {
    beforeEach(() => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })

    //TC-01
    it('Pengguna dapat membuka halaman login', () => {
      loginPage.companyBranding().should('be.visible');
      loginPage.orangeLogo().should('exist');
      loginPage.copytextLogin().should('contain', 'Login');
    })

    //TC-02
    it('Pengguna dapat menginput username', () => {
      loginPage.inputUsername().should('exist').type('Admin');
    })

    //TC-03
    it('Pengguna dapat menginput password', () => {
      loginPage.inputPassword().should('exist').type('admin123');
    })

    //TC-04
    it('Pengguna tidak dapat melakukan login tanpa input username', () => {
      loginPage.inputUsername().should('exist').clear().should('have.value', '');
      loginPage.inputPassword().should('exist').type('admin123');
      loginPage.submitButton().click();
      loginPage.errorMessageRequired().should('contain','Required');
    })

    //TC-05
    it('Pengguna tidak dapat melakukan login tanpa input password', () => {
      loginPage.inputUsername().should('exist').type('Admin');
      loginPage.inputPassword().should('exist').clear().should('have.value', '');
      loginPage.submitButton().click();
      loginPage.errorMessageRequired().should('contain','Required');
    })
    
    //TC-06
    it('Pengguna tidak dapat melakukan login tanpa input username dan password', () => {
      loginPage.submitButton().should('exist').click();
      loginPage.errorMessageRequired().should('contain','Required');
    })

    //TC-07
    it('Pengguna tidak dapat melakukan login dengan username yang salah', () => {
      loginPage.inputUsername().should('exist').type('Admin-test');
      loginPage.inputPassword().should('exist').type('admin123');
      loginPage.submitButton().click();
      loginPage.alertInvalidCredential().should('contain','Invalid credentials');
    })

    //TC-08
    it('Pengguna tidak dapat melakukan login dengan password yang salah', () => {
      loginPage.inputUsername().should('exist').type('Admin');
      loginPage.inputPassword().should('exist').type('admin123-test');
      loginPage.submitButton().click();
      loginPage.alertInvalidCredential().should('contain','Invalid credentials');
    })

    //TC-09
    it('Pengguna tidak dapat melakukan login dengan username dan password yang mengandung spesial karakter', () => {
      loginPage.inputUsername().should('exist').type('@Admin');
      loginPage.inputPassword().should('exist').type('@admin123-test');
      loginPage.submitButton().click();
      loginPage.alertInvalidCredential().should('contain','Invalid credentials');
    })

    //TC-10
    it('Pengguna berhasil melakukan login', () => {
      loginPage.inputUsername().should('exist').type('Admin');
      loginPage.inputPassword().should('exist').type('admin123');
      cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary');
      cy.intercept('GET', '**/shortcuts').as('shortcuts');
      cy.intercept('GET', '**/subunit').as('subunit');
      cy.intercept('GET', '**/locations').as('locations');
      cy.intercept('GET', '**/time-at-work*').as('timeAtWork');
      loginPage.submitButton().click();
      cy.wait('@actionSummary');
      cy.wait('@shortcuts');
      cy.wait('@subunit');
      cy.wait('@locations');
      cy.wait('@timeAtWork');
      loginPage.dashboardMenu().should('contain','Dashboard');
    })
})

describe('forgot password feature', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  //TC-01
  it('Pengguna dapat membuka halaman login', () => {
    forgotPassword.companyBranding().should('be.visible');
    forgotPassword.orangeLogo().should('exist');
    forgotPassword.copytextLogin().should('contain', 'Login');
  })

  //TC-02
  it('Pengguna dapat menklik forgot password', () => {
    forgotPassword.forgotYourPasswordCTA().should('be.visible').click();
    forgotPassword.copytextResetPassword().should('be.visible').and('contain', 'Reset Password');
  })

  //TC-03
  it('Pengguna dapat menklik cancel button', () => {
    forgotPassword.forgotYourPasswordCTA().should('be.visible').click();
    forgotPassword.copytextResetPassword().should('be.visible').and('contain', 'Reset Password');
    forgotPassword.cancelButton().should('be.visible');
    forgotPassword.cancelButton().click();
    forgotPassword.copytextLogin().should('contain', 'Login');
  })

  //TC-04
  it('Pengguna tidak dapat reset password tanpa input username', () => {
    forgotPassword.forgotYourPasswordCTA().should('be.visible').click();
    forgotPassword.copytextResetPassword().should('be.visible').and('contain', 'Reset Password');
    forgotPassword.resetPasswordButton().should('be.visible').click();
    forgotPassword.errorMessageRequired().should('be.visible').and('contain','Required');
  })

  //TC-05
  it('Pengguna berhasil mereset password', () => {
    forgotPassword.forgotYourPasswordCTA().should('be.visible').click();
    forgotPassword.copytextResetPassword().should('be.visible').and('contain', 'Reset Password');
    forgotPassword.inputUsername().type('Admin')
    forgotPassword.resetPasswordButton().should('be.visible').click();
    forgotPassword.copytextResetPassword().should('be.visible').and('contain','successfully');
  })

})

describe('directory feature', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/action-summary').as('actionSummary');
    cy.intercept('GET', '**/shortcuts').as('shortcuts');
    cy.intercept('GET', '**/subunit').as('subunit');
    cy.intercept('GET', '**/locations').as('locations');
    cy.intercept('GET', '**/time-at-work*').as('timeAtWork');
    cy.intercept('GET', '**/employees*').as('employees');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  //TC-01
  it('Pengguna dapat membuka halaman login', () => {
    directoryPage.companyBranding().should('be.visible');
    directoryPage.orangeLogo().should('exist');
    directoryPage.copytextLogin().should('contain', 'Login');
  })

  //TC-02
  it('Pengguna berhasil melakukan login', () => {
    directoryPage.inputUsername().should('exist').type('Admin');
    directoryPage.inputPassword().should('exist').type('admin123');
    
    directoryPage.submitButton().click();
    cy.wait('@actionSummary');
    cy.wait('@shortcuts');
    cy.wait('@subunit');
    cy.wait('@locations');
    cy.wait('@timeAtWork');
    directoryPage.dashboardMenu().should('contain','Dashboard');
  })

  //TC-03
  it('Pengguna dapat membuka halaman directory', () => {
    directoryPage.inputUsername().should('exist').type('Admin');
    directoryPage.inputPassword().should('exist').type('admin123');
    
    directoryPage.submitButton().click();
    cy.wait('@actionSummary');
    cy.wait('@shortcuts');
    cy.wait('@subunit');
    cy.wait('@locations');
    cy.wait('@timeAtWork');
    directoryPage.dashboardMenu().should('be.visible').and('contain','Dashboard');
    directoryPage.directoryMenu().should('be.visible').click();
    cy.wait('@employees');
    directoryPage.copytextDirectory().should('be.visible').and('contain','Directory');

  })

  //TC-04
  it('Pengguna dapat memfilter berdasarkan employee name', () => {
    directoryPage.inputUsername().should('exist').type('Admin');
    directoryPage.inputPassword().should('exist').type('admin123');
    
    directoryPage.submitButton().click();
    cy.wait('@actionSummary');
    cy.wait('@shortcuts');
    cy.wait('@subunit');
    cy.wait('@locations');
    cy.wait('@timeAtWork');
    directoryPage.dashboardMenu().should('be.visible').and('contain','Dashboard');
    directoryPage.directoryMenu().should('be.visible').click();
    cy.wait('@employees');
    directoryPage.copytextDirectory().should('be.visible').and('contain','Directory');

    directoryPage.inputNameEmployee().should('exist').type('Peter');
    directoryPage.employeeOption().should('be.visible').and('contain','Peter').click();
    directoryPage.searchButton().should('exist').click();
    directoryPage.employeeCard().should('be.visible').and('contain','Peter');
  })

  //TC-05
  it('Pengguna dapat memfilter berdasarkan employee name', () => {
    directoryPage.inputUsername().should('exist').type('Admin');
    directoryPage.inputPassword().should('exist').type('admin123');
    
    directoryPage.submitButton().click();
    cy.wait('@actionSummary');
    cy.wait('@shortcuts');
    cy.wait('@subunit');
    cy.wait('@locations');
    cy.wait('@timeAtWork');
    directoryPage.dashboardMenu().should('be.visible').and('contain','Dashboard');
    directoryPage.directoryMenu().should('be.visible').click();
    cy.wait('@employees');
    directoryPage.copytextDirectory().should('be.visible').and('contain','Directory');
    directoryPage.jobTitleDropdown().should('exist').click();
    directoryPage.cfoOption().should('exist').click();
    directoryPage.searchButton().should('exist').click();
    directoryPage.employeeCard().should('be.visible').and('contain','Peter');
  })

  //TC-06
  it('Pengguna dapat memfilter berdasarkan location', () => {
    directoryPage.inputUsername().should('exist').type('Admin');
    directoryPage.inputPassword().should('exist').type('admin123');
    
    directoryPage.submitButton().click();
    cy.wait('@actionSummary');
    cy.wait('@shortcuts');
    cy.wait('@subunit');
    cy.wait('@locations');
    cy.wait('@timeAtWork');
    directoryPage.dashboardMenu().should('be.visible').and('contain','Dashboard');
    directoryPage.directoryMenu().should('be.visible').click();
    cy.wait('@employees');
    directoryPage.copytextDirectory().should('be.visible').and('contain','Directory');
    directoryPage.locationDropdown().should('exist').click();
    directoryPage.newYorkOption().should('exist').click();
    directoryPage.searchButton().should('exist').click();
    directoryPage.employeeCard().should('be.visible').and('contain','Peter');
  })

  //TC-07
  it('Pengguna dapat menggunakan kombinasi filter', () => {
    directoryPage.inputUsername().should('exist').type('Admin');
    directoryPage.inputPassword().should('exist').type('admin123');
    
    directoryPage.submitButton().click();
    cy.wait('@actionSummary');
    cy.wait('@shortcuts');
    cy.wait('@subunit');
    cy.wait('@locations');
    cy.wait('@timeAtWork');
    directoryPage.dashboardMenu().should('be.visible').and('contain','Dashboard');
    directoryPage.directoryMenu().should('be.visible').click();
    cy.wait('@employees');
    directoryPage.copytextDirectory().should('be.visible').and('contain','Directory');

    directoryPage.inputNameEmployee().should('exist').type('Peter');
    directoryPage.employeeOption().should('be.visible').and('contain','Peter').click();
    directoryPage.searchButton().should('exist').click();

    directoryPage.jobTitleDropdown().should('exist').click();
    directoryPage.cfoOption().should('exist').click();
    directoryPage.searchButton().should('exist').click();

    directoryPage.locationDropdown().should('exist').click();
    directoryPage.newYorkOption().should('exist').click();
    directoryPage.searchButton().should('exist').click();
    directoryPage.employeeCard().should('be.visible').and('contain','Peter');
  })

  //TC-08
  it('Pengguna dapat membuka employee details', () => {
    directoryPage.inputUsername().should('exist').type('Admin');
    directoryPage.inputPassword().should('exist').type('admin123');
    
    directoryPage.submitButton().click();
    cy.wait('@actionSummary');
    cy.wait('@shortcuts');
    cy.wait('@subunit');
    cy.wait('@locations');
    cy.wait('@timeAtWork');
    directoryPage.dashboardMenu().should('be.visible').and('contain','Dashboard');
    directoryPage.directoryMenu().should('be.visible').click();
    cy.wait('@employees');
    directoryPage.copytextDirectory().should('be.visible').and('contain','Directory');

    directoryPage.inputNameEmployee().should('exist').type('Peter');
    directoryPage.employeeOption().should('be.visible').and('contain','Peter').click();
    directoryPage.searchButton().should('exist').click();

    directoryPage.jobTitleDropdown().should('exist').click();
    directoryPage.cfoOption().should('exist').click();
    directoryPage.searchButton().should('exist').click();

    directoryPage.locationDropdown().should('exist').click();
    directoryPage.newYorkOption().should('exist').click();
    directoryPage.searchButton().should('exist').click();
    directoryPage.employeeCard().should('be.visible').and('contain','Peter').click();
    directoryPage.employeeCardDetails().should('be.visible')
  })

  //TC-08
  it('Pengguna dapat mereset employee filter', () => {
    directoryPage.inputUsername().should('exist').type('Admin');
    directoryPage.inputPassword().should('exist').type('admin123');
    
    directoryPage.submitButton().click();
    cy.wait('@actionSummary');
    cy.wait('@shortcuts');
    cy.wait('@subunit');
    cy.wait('@locations');
    cy.wait('@timeAtWork');
    directoryPage.dashboardMenu().should('be.visible').and('contain','Dashboard');
    directoryPage.directoryMenu().should('be.visible').click();
    cy.wait('@employees');
    directoryPage.copytextDirectory().should('be.visible').and('contain','Directory');

    directoryPage.inputNameEmployee().should('exist').type('Peter');
    directoryPage.employeeOption().should('be.visible').and('contain','Peter').click();
    directoryPage.searchButton().should('exist').click();

    directoryPage.jobTitleDropdown().should('exist').click();
    directoryPage.cfoOption().should('exist').click();
    directoryPage.searchButton().should('exist').click();

    directoryPage.locationDropdown().should('exist').click();
    directoryPage.newYorkOption().should('exist').click();
    directoryPage.searchButton().should('exist').click();
    directoryPage.employeeCard().should('be.visible').and('contain','Peter').click();
    directoryPage.employeeCardDetails().should('be.visible')

    directoryPage.resetButton().should('exist').click();
    directoryPage.employeeCard().should('be.visible')
  })
})