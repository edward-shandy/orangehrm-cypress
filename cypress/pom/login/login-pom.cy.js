export default class loginPage {
    static inputUsername(){
        return cy.get('input[name="username"]')
    }
}