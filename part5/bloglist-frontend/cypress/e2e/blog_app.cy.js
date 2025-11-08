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
      cy.get('#username-input').type('test_user')
      cy.get('#password-input').type('testpassword')
      cy.get('#login-button').click()

      cy.get('html').should('not.contain', 'Log in to application')
      cy.contains('TEST logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username-input').type('wrong')
      cy.get('#password-input').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Log in to application')
      cy.contains('wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username-input').type('test_user')
      cy.get('#password-input').type('testpassword')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#show-create-blog-div-button').click()
      cy.get('#title-input').type('Test title')
      cy.get('#author-input').type('Test author')
      cy.get('#url-input').type('Test url')
      cy.get('#create-blog-button').click()

      cy.contains('a new blog Test title by Test author added')
      cy.contains('Test title Test author')
    })
  })

describe('When logged in and a blog created', function() {
    beforeEach(function() {
      cy.get('#username-input').type('test_user')
      cy.get('#password-input').type('testpassword')
      cy.get('#login-button').click()
      cy.get('#show-create-blog-div-button').click()
      cy.get('#title-input').type('Test title')
      cy.get('#author-input').type('Test author')
      cy.get('#url-input').type('Test url')
      cy.get('#create-blog-button').click()
    })

    it('A blog can be liked by user', function() {
      // At that state of the tests, of course only one blog is created so I can look for his button with the text
      cy.contains('view').click()
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')
    })






    
  })












})