export class Popup {

    haveText(message) {
        cy.get('.swal2-html-container')
            .should('have.text', message)
    }

}