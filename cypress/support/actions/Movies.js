export class Movies {

    goToForm() {
        cy.get('a[href$="register"]').click()
    }

    submit() {
        cy.contains('button', 'Cadastrar').click()
    }

    create(movie) {
        this.goToForm()

        cy.get('input[name=title]').type(movie.title)
        cy.get('#overview').type(movie.title)

        cy.get('#select_company_id .react-select__indicator').click()
        cy.get('.react-select__option')
            .contains(movie.company)
            .click()

        cy.get('#select_year .react-select__indicator').click()
        cy.get('.react-select__option')
            .contains(movie.release_year)
            .click()

        cy.get('input[name=cover]')
            .selectFile('./cypress/fixtures' + movie.cover)

        if (movie.featured) {
            cy.get('.featured .react-switch').click()
        }

        this.submit()
    }

    search(target) {
        cy.get('input[placeholder="Busque pelo nome"]').type(target)
        cy.get('.actions button').click()
    }

    alertHaveText(target) {
        cy.get('.alert')
            .each((alert, index) => {
                expect(alert).to.contain(target[index])
            })
    }

    tableHaveContent(content) {
        const contents = Array.isArray(content) ? content : [content]
        
        contents.forEach(c => {
            cy.contains('td', c).should('be.visible')
        })
    }

    remove(title) {
        cy.contains('td', title)
            .parent()
            .find('button')
            .click()
        cy.get('.confirm-removal').click()
    }

}