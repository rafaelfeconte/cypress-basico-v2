/// <reference types="cypress" />

describe('Central de atendimento ao cliente TAT', function() {

    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    
    it('verificar o titulo da aplicação', function() {
        cy.title().should('be.eq', 'Central de Atendimento ao Cliente TAT')
    })
    
    it('preenchendo os campos obrigatórios e enviando o formulário', function() {
        cy.get('#firstName').should('be.visible').type('rafa master').should('have.value', 'rafa master')
        cy.get('#lastName').should('be.visible').type('conte').should('have.value', 'conte')
        cy.get('#email').should('be.visible').type('masterrafa@qa.com.br').should('have.value', 'masterrafa@qa.com.br')
        cy.get('#phone').should('be.visible').type('99999999999').should('have.value', '99999999999')
        cy.get('#open-text-area').should('be.visible').type('Ola, tudo bem?').should('have.value', 'Ola, tudo bem?')
        //motando um seletor contains para dois argumentos o primerio é da tag button e o segundo o texto
        //lembrado que o texto tem que ser unico 
        cy.contains('button', 'Enviar').should('be.visible').click()

        cy.get('.success').should('be.visible')
    })

    it('preenchendo os campos obrigatórios e enviando o formulário passando objeto delay', function() {
        const longText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        cy.get('#firstName').should('be.visible').type('rafa master').should('have.value', 'rafa master')
        cy.get('#lastName').should('be.visible').type('conte').should('have.value', 'conte')
        cy.get('#email').should('be.visible').type('masterrafa@qa.com.br').should('have.value', 'masterrafa@qa.com.br')
        cy.get('#phone').should('be.visible').type('99999999999').should('have.value', '99999999999')
        cy.get('#open-text-area').should('be.visible').type(longText, {delay: 0}).should('have.value', longText)
        cy.get('button[type="submit"]').should('be.visible').click()

        cy.get('.success').should('be.visible')
    })

    it('email invalido', function() {
        cy.get('#firstName').should('be.visible').type('rafa master').should('have.value', 'rafa master')
        cy.get('#lastName').should('be.visible').type('conte').should('have.value', 'conte')
        cy.get('#email').should('be.visible').type('masterrafa!qa.com.br').should('have.value', 'masterrafa!qa.com.br')
        cy.get('#phone').should('be.visible').type('99999999999').should('have.value', '99999999999')
        cy.get('#open-text-area').should('be.visible').type('Ola, tudo bem?').should('have.value', 'Ola, tudo bem?')
        cy.get('button[type="submit"]').should('be.visible').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone digitando apenas letras', function() {
        cy.get('#phone').should('be.visible').type('rafa master').should('have.value', '')
        
    })
    it('campo telefone obrigatorio', function() {
        cy.get('#firstName').should('be.visible').type('rafa master').should('have.value', 'rafa master')
        cy.get('#lastName').should('be.visible').type('conte').should('have.value', 'conte')
        cy.get('#email').should('be.visible').type('masterrafa@qa.com.br').should('have.value', 'masterrafa@qa.com.br')
        cy.get('#phone-checkbox').should('be.visible').click()
        cy.get('#open-text-area').should('be.visible').type('Ola, tudo bem?').should('have.value', 'Ola, tudo bem?')
        cy.get('button[type="submit"]').should('be.visible').click()

        cy.get('.error').should('be.visible')
    })

    it('campo text area limpo depois de ser digitado', function() {
        cy.get('#open-text-area')
            .should('be.visible')
                .type('rafa master')
                    .should('have.value', 'rafa master')
                        .clear()
                            .should('have.value', '')
        
    })
    it('preenchendo os campos obrigatórios e enviando o formulário com custom command', function() {
        cy.fillMandatoryFieldsAndSubmit()
        
        cy.get('.success').should('be.visible')

       })

    it('selecionando opção com select com texto', function () {
        cy.get('#product').select('Cursos').should('have.value', 'cursos')
    })

    it('selecionando opção com select com value', function () {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })
    it('selecionando opção com select com value', function () {
        cy.get('#product').select(4).should('have.value', 'youtube')
    })

    it('Clicando no radio button utilizando a funcionalidade check', function (){
        cy.get('input[type="radio"]').should('be.visible').check('ajuda').should('have.value', 'ajuda')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marcando mais de um checkbox e desmarcando o ultimo', function() {
        cy.get('input[type="checkbox"]')
            .should('have.length', 2)
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('marcando apenas um checkbox espeficico', function(){
        cy.get('input[type="checkbox"]')
            .should('have.length', 2)
            .check('email')
            .should('have.value', 'email').should('be.checked')
    })

    it.only('utilizando trade-offs para lidar com links que abram outras página', function(){
        cy.get('a[href="privacy.html"]')
            .invoke('removeAttr', 'target').click()
                  cy.get('#title').contains('CAC TAT - Política de privacidade')
    })
})

