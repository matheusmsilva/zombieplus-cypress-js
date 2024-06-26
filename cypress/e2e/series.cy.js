/// <reference types="cypress"/>
import { Login } from '../support/actions/Login.js'
import { Series } from '../support/actions/Series.js'
import { Popup } from '../support/actions/Components.js'
import { Database } from '../support/database/index.js'
import data from '../fixtures/series.json'

const login = new Login()
const series = new Series()
const popup = new Popup()
const database = new Database()

describe('series tests', () => {

    before(() => {
        cy.task('executeSQL', 'DELETE FROM tvshows;')
    })

    it('should register a new serie', () => {
        const serie = data.create
        
        login.do('admin@zombieplus.com', 'pwd123', 'Admin')
        series.goTo()
        series.create(serie)
        popup.haveText(`A série '${serie.title}' foi adicionada ao catálogo.`)
    })

    it('should remove a serie', () => {
        const serie = data.to_remove
        
        database.insertSerie(serie)
        login.do('admin@zombieplus.com', 'pwd123', 'Admin')
        series.goTo()
        series.remove(serie.title)
        popup.haveText('Série removida com sucesso.')
    })

    it('should not register when serie title already exists', () => {
        const serie = data.duplicate
        
        database.insertSerie(serie)
        login.do('admin@zombieplus.com', 'pwd123', 'Admin')
        series.goTo()
        series.create(serie)
        popup.haveText(`O título '${serie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
    })

    it('should not register when mandatory fields are not filled', () => {
        login.do('admin@zombieplus.com', 'pwd123', 'Admin')
        series.goTo()
        series.goToForm()
        series.submit()
        series.alertHaveText([
            'Campo obrigatório',
            'Campo obrigatório',
            'Campo obrigatório',
            'Campo obrigatório',
            'Campo obrigatório (apenas números)'
        ])
    })

    it('should return series which title contains zumbi', () => {
        const serie = data.search

        serie.data.forEach((s) => {
            database.insertSerie(s)
        })
        login.do('admin@zombieplus.com', 'pwd123', 'Admin')
        series.goTo()
        series.search(serie.input)
        series.tableHaveContent(serie.outputs)
    })
    
})