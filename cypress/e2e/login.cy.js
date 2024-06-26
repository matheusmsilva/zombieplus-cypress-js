/// <reference types="cypress"/>
import { Login } from '../support/actions/Login'
import { Popup } from '../support/actions/Components'

const login = new Login()
const popup = new Popup()

describe('login tests', () => {

    it('should log in as admin', () => {
        login.visit()
        login.submit('admin@zombieplus.com', 'pwd123')
        login.isLoggedIn('Admin')
    })
    
    it('should not log in when email is invalid', () => {
        login.visit()
        login.submit('admin.zombieplus.com', 'pwd123')
        login.alertHaveText('Email incorreto')        
    })

    it('should not log in when password is incorrect', () => {
        login.visit()
        login.submit('admin@zombieplus.com', 'abc123')
        const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
        popup.haveText(message)
    })

    it('should not log in when email is not filled', () => {
        login.visit()
        login.submit('', 'abc123')
        login.alertHaveText('Campo obrigatório')
    })
    
    it('should not log in when password is not filled', () => {
        login.visit()
        login.submit('admin@zombieplus.com', '')
        login.alertHaveText('Campo obrigatório')
    })
    
    it('should not log in when mandatory fields are not filled', () => {
        login.visit()
        login.submit('', '')
        login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
    })
})