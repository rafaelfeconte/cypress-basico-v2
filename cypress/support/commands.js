Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').should('be.visible').type('rafa master').should('have.value', 'rafa master')
    cy.get('#lastName').should('be.visible').type('conte').should('have.value', 'conte')
    cy.get('#email').should('be.visible').type('masterrafa@qa.com.br').should('have.value', 'masterrafa@qa.com.br')
    cy.get('#phone').should('be.visible').type('99999999999').should('have.value', '99999999999')
    cy.get('#open-text-area').should('be.visible').type('Ola, tudo bem?').should('have.value', 'Ola, tudo bem?')
    cy.contains('button', 'Enviar').should('be.visible').click()
})
