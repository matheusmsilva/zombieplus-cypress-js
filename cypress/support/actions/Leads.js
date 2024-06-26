export class Leads {

    visit() {
        cy.visit("http://localhost:3000")
    }

    openLeadModal() {
        cy.contains('button', 'Aperte o play').click()
        cy.contains('h2', 'Fila de espera').should('be.visible')
    }

    submitLeadForm(name, email) {
        if (name)
            cy.get('input[placeholder="Informe seu nome"]').type(name)
        if (email)
            cy.get('input[placeholder="Informe seu email"]').type(email)
        cy.contains('button', 'Quero entrar na fila!').click()
    }

    alertHaveText(target) {
        cy.get('.alert')
            .each((alert, index) => {
                expect(alert).to.contain(target[index])
            })
    }

}