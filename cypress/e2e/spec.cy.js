beforeEach(() => {
  cy.visit('http://localhost:3000/landing')
  cy.url().should('include', '3000')

  cy.contains("Get started").click();

  cy.origin("https://spotforus-auth.eu.auth0.com/**", () => {
    cy.get("input#username").type("cypress");
    cy.get("input#password").type("Test-123");
    cy.contains("button[value=default]", "Continue").click();
    cy.wait(500)
  });

  // cy.contains("Get started").click();

  // cy.origin("https://spotforus-auth.eu.auth0.com/**", () => {
  //   cy.get("input#username").type("cypress");
  //   cy.get("input#password").type("Test-123");
  //   cy.contains("button[value=default]", "Continue").click();
  //   cy.wait(500)
  // });

  // cy.contains("Get started").click();

  // cy.origin("https://spotforus-auth.eu.auth0.com/**", () => {
  //   cy.get("input#username").type("cypress");
  //   cy.get("input#password").type("Test-123");
  //   cy.contains("button[value=default]", "Continue").click();
  //   cy.wait(2000)
  // });
})

describe('Tenant', () => {
  // it('Joins houeshold', () => {
  //   // cy.visit('http://localhost:3000/home')
  //   cy.get('input[name=joinCode]').type(1009)
  //   cy.wait(500);
  //   cy.get('button[type=submit]').click();
   
  // })

  // it('Opens MyHousehold page', () => {

  // })

  
  // it('Send Complaint/Feedback on MyHousehold', () => {

  // })

  // it('Views all announcements', () => {

  // })

  // it('Sorts snnouncements', () => {

  // })

  // it('Searches for announcements', () => {

  // })

  it('Creates an announcement', () => {
    cy.contains("Announcements").click();
    cy.contains("New announcement").click();
    cy.get('select[id=type]').select('Info');
    cy.get('textarea[id=content]').type('This announcement has been created by Cypress!');
    cy.get('button[type=submit]').click();
    cy.wait(10000);
    // cy.url().should('include', '/announcements')
  })

  // it('Deletes an announcement', () => {

  // })

  // it('Leaves household', () => {

  // })

  it('Logs out and lands on the CTA page', () => {
    cy.contains("Log out").click();
    cy.url().should('include', '/landing')
  })
})


// describe('Auth0', function () {
//   // beforeEach(function () {
//   //   cy.loginToAuth0(
//   //     Cypress.env('auth0_username'),
//   //     Cypress.env('auth0_password')
//   //   )
//   //   cy.visit('hhtp://localhost/home')
//   // })

//   it('shows onboarding', function () {
//     cy.visit("http://localhost:3000/landing");
//     cy.contains("Get started").click();

//     cy.origin("https://spotforus-auth.eu.auth0.com/**", () => {
//       cy.get("input#username").type("cypress");
//       cy.get("input#password").type("Test-123");
//       cy.contains("button[value=default]", "Continue").click();

//     });
//     cy.contains("Get started").click();
//     cy.origin("https://spotforus-auth.eu.auth0.com/**", () => {
//       cy.get("input#username").type("cypress");
//       cy.get("input#password").type("Test-123");
//       cy.contains("button[value=default]", "Continue").click();

//     });
//   })
// })

// describe('Join household', () => {
//   it('passes', () => {
//     cy.visit('http://localhost:3000/home')
//     cy.get('input[name=joinCode]').type(1005)
//     cy.contains('Submit').click()
//     cy.contains('Welcome')
//     .should('be.visible')
//   })
// })

