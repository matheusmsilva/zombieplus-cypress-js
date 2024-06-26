export class Login {

    do(email, password, username) {
        this.visit()
        this.submit(email, password)
        this.isLoggedIn(username)
    }

    visit() {
        cy.visit('/admin/login')
        cy.get('.login-form').should('be.visible')
    }

    submit(email, password) {
        if(email)
            cy.get('input[placeholder="E-mail"]').type(email)
        
        if(password)
            cy.get('input[placeholder="Senha"]').type(password)

        cy.contains('button', 'Entrar').click()
    }

    alertHaveText(target) {
        cy.get('.alert')
            .each((alert, index) => {
                expect(alert).to.contain(target[index])
            })
    }

    isLoggedIn(username) {
        cy.get('.logged-user').should('have.text', `Olá, ${username}`)
    }

}