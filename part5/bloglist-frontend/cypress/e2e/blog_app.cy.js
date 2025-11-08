describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {username: "test_user", name: "TEST", password: "testpassword"}
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test_user')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()

      cy.get('html').should('not.contain', 'Log in to application')
      cy.contains('TEST logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()

      cy.contains('Log in to application')
      cy.contains('wrong username or password')
    })
  })
})