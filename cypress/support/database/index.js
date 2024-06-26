import { faker } from '@faker-js/faker'

export class Database {

    getCompanyIdByName(company) {
        const query = `
            SELECT id FROM companies WHERE name = '${company}';
        `

        return cy.task('executeSQL', query)
    }

    insertMovie(movie) {
        this.getCompanyIdByName(movie.company).then(result => {

            const companyId = result.rows[0].id
            const currentDate = new Date().toISOString();

            const query = `
                INSERT INTO movies (id, title, overview, featured, release_year, company_id, created_at, updated_at)
                VALUES (
                '${faker.string.uuid()}',
                '${movie.title}',
                '${movie.overview}',
                '${movie.featured}',
                '${movie.release_year}',
                '${companyId}',
                '${currentDate}',
                '${currentDate}'
                )
            `
            cy.task('executeSQL', query)
        })
    }

    insertSerie(serie) {
        this.getCompanyIdByName(serie.company).then(result => {

            const companyId = result.rows[0].id
            const currentDate = new Date().toISOString();

            const query = `
                INSERT INTO tvshows (id, title, overview, featured, seasons, release_year, company_id, created_at, updated_at)
                VALUES (
                '${faker.string.uuid()}',
                '${serie.title}',
                '${serie.overview}',
                '${serie.featured}',
                '${serie.season}',
                '${serie.release_year}',
                '${companyId}',
                '${currentDate}',
                '${currentDate}'
                )
            `
            cy.task('executeSQL', query)
        })
    }

}