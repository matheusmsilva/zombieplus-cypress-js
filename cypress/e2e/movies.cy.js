/// <reference types="cypress"/>
import { Login } from '../support/actions/Login.js'
import { Movies } from '../support/actions/Movies.js'
import { Popup } from '../support/actions/Components.js'
import { Database } from '../support/database/index.js'
import data from '../fixtures/movies.json'

const login = new Login()
const movies = new Movies()
const popup = new Popup()
const database = new Database()

describe('movies tests', () => {

    before(() => {
        cy.task('executeSQL', 'DELETE FROM movies;')
    })

    it('should register a new movie', () => {
        const movie = data.create
        
        login.do('admin@zombieplus.com', 'pwd123', 'Admin')
        movies.create(movie)
        popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)
    })

    it('should remove a movie', () => {
        const movie = data.to_remove
        
        database.insertMovie(movie)
        login.do('admin@zombieplus.com', 'pwd123', 'Admin')
        movies.remove(movie.title)
        popup.haveText('Filme removido com sucesso.')
    })

    it('should not register when movie title already exists', () => {
        const movie = data.duplicate
        
        database.insertMovie(movie)
        login.do('admin@zombieplus.com', 'pwd123', 'Admin')
        movies.create(movie)
        popup.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
    })

    it('should not register when mandatory fields are not filled', () => {
        login.do('admin@zombieplus.com', 'pwd123', 'Admin')
        movies.goToForm()
        movies.submit()
        movies.alertHaveText([
            'Campo obrigatório',
            'Campo obrigatório',
            'Campo obrigatório',
            'Campo obrigatório'
        ])
    })

    it('should return movies which title contains zumbi', () => {
        const movie = data.search

        movie.data.forEach((m) => {
            database.insertMovie(m)
        })
        login.do('admin@zombieplus.com', 'pwd123', 'Admin')
        movies.search(movie.input)
        movies.tableHaveContent(movie.outputs)
    })

})