export class Series {

    goTo() {
        cy.get('a[href$="tvshows"]').click()
    }

    goToForm() {
        cy.get('a[href$="register"]').click()
    }

    submit() {
        cy.contains('button', 'Cadastrar').click()
    }

    create(serie) {
        this.goToForm()

        cy.get('input[name=title]').type(serie.title)
        cy.get('textarea[name=overview]').type(serie.title)

        cy.get('#select_company_id .react-select__indicator').click()
        cy.get('.react-select__option')
            .contains(serie.company)
            .click()

        cy.get('#select_year .react-select__indicator').click()
        cy.get('.react-select__option')
            .contains(serie.release_year)
            .click()

        cy.get('input[name=cover]')
            .selectFile('./cypress/fixtures' + serie.cover)

        cy.get('input[name=seasons]').type(serie.season)

        if (serie.featured) {
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