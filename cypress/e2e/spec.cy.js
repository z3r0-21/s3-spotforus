beforeEach(() => {
  cy.visit('http://localhost:3000/landing')
  cy.url().should('include', '3000')

  cy.contains("Get started").click();

  cy.origin("https://spotforus-auth.eu.auth0.com/**", () => {
    cy.get("input#username").type("d.prisadnikov@student.fontys.nl");
    cy.get("input#password").type("Test-123");
    cy.contains("button[value=default]", "Continue").click();
   

  });
  cy.contains("Enter").click();
})

describe('Admin', () => {
  it('Search for an account and open it', () => {
    cy.contains("Users").click();
    cy.get('table').contains('td', 'd.prisadnikov@student.fontys.nl')
    cy.get('table > tbody > tr:nth-child(2) > td:nth-child(4) > a > button').click();
    cy.get('div > div > div:nth-child(1) > div:nth-child(3)').should(
      "have.text",
      "Email: test6@gmail.com"
    );
  })

  it('Block account', () => {
    cy.contains("Users").click();
    cy.get('table > tbody > tr:nth-child(2) > td:nth-child(4) > a > button').click();
    cy.get('div > div > div:nth-child(1) > div:nth-child(3)').should(
      "have.text",
      "Email: test6@gmail.com"
    );
    cy.contains("Block sign-in").click()
    .then(() => {
      cy.contains('This user has been blocked from signing in.').should('be.visible')     
    })  
  })

  it('Unblock account', () => {
    cy.contains("Users").click();
    cy.get('table > tbody > tr:nth-child(2) > td:nth-child(4) > a > button').click();
    cy.contains('Email: test6@gmail.com').should('be.visible')     
    cy.contains('This user has been blocked from signing in.').should('be.visible')     
    cy.contains("Unblock").click()
    cy.contains('This user has been blocked from signing in').should('not.exist')   
  })


  it('Search for an household and open it', () => {
    cy.contains("Households").click();
    cy.get('div > div > div.overflow-x-scroll > table > tbody > tr:nth-child(1) > td:nth-child(5) > a > button').click();
    cy.get('div > div.grid.grid-cols-2.gap-x-3.gap-y-5.p-2 > div:nth-child(1) > div:nth-child(2)').should(
      "have.text",
      "ID: 3"
    );
  })

  it('Post an announcement', () => {
    cy.contains("Households").click();
    cy.get('div > div > div.overflow-x-scroll > table > tbody > tr:nth-child(1) > td:nth-child(5) > a > button').click();
    cy.contains('New announcement').click();
    cy.get('select[id=type]').select('Info');
    cy.get('textarea[id=content]').type('This announcement has been created by Cypress!');

    const stub = cy.stub()  
    cy.on ('window:alert', stub)
     cy.get('button[type=submit]').click() 
     cy.on('window:alert', (str) => {
      expect(str).to.equal(`Created successfully.`)
    })
  })
 

  it('Logs out and lands on the CTA page', () => {
    cy.contains("Log out").click();
    cy.url().should('include', '/landing')
  })
})


