/// <reference types="cypress"/>
import { Leads } from '../support/actions/Leads.js'
import { Popup } from '../support/actions/Components.js'
import { faker } from '@faker-js/faker'

const leads = new Leads()
const popup = new Popup()

describe('leads tests', () => {
  
  it('should register new lead', () => {
    const leadEmail = faker.internet.email()
    const leadName = faker.person.fullName()

    leads.visit()
    leads.openLeadModal()
    leads.submitLeadForm(leadName, leadEmail)
    popup.haveText('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.')
    
  })

  it('should not register when email already exists', () => {
    const leadEmail = faker.internet.email()
    const leadName = faker.person.fullName()

    cy.request({
      url: 'http://localhost:3333/leads',
      method: 'POST',
      body: {
        name: leadName,
        email: leadEmail
      }
    })

    leads.visit()
    leads.openLeadModal()
    leads.submitLeadForm(leadName, leadEmail)
    popup.haveText('Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.')
  })

  it('should not register when email is invalid', () => {
    const leadName = faker.person.fullName()

    leads.visit()
    leads.openLeadModal()
    leads.submitLeadForm(leadName, 'matheus.mota.com')
    leads.alertHaveText('Email incorreto')
  })

  it('should not register when name is not filled', () => {
    const leadEmail = faker.internet.email()

    leads.visit()
    leads.openLeadModal()
    leads.submitLeadForm('', leadEmail)
    leads.alertHaveText('Campo obrigatório')
  })

  it('should not register when email is not filled', () => {
    leads.visit()
    leads.openLeadModal()
    leads.submitLeadForm('Matheus Mota', '')
    leads.alertHaveText('Campo obrigatório')
  })

  it('should not register when mandatory fields are not filled', () => {
    leads.visit()
    leads.openLeadModal()
    leads.submitLeadForm('', '')
    const messages = ['Campo obrigatório', 'Campo obrigatório']
    leads.alertHaveText(messages)
  })
})