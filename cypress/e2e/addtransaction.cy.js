describe('add transaction test', () => {
  beforeEach(() => {
    cy.login();
  });

  it('add transaction test', () => {
    cy.visit('http://localhost:3000/transactions/add');

    cy.get('[data-cy=date_input]').type('2021-11-01');
    cy.get('[data-cy=place_input]').select('Irish Pub');
    cy.get('[data-cy=amount_input]').type('200');
    cy.get('[data-cy=submit_transaction]').click();

    cy.get('[data-cy=transaction_user]').eq(9).contains(Cypress.env('auth_username'));
    cy.get('[data-cy=transaction_amount]').each((el, idx) => {
      if (idx === 9) {
        expect(Number(el[0].textContent.replace(/^\D+/g, '').replace(/,/, '.'))).to.equal(200);
      }
    });
    cy.get('[data-cy=transaction]').should('have.length', 10);
  });

  it('remove again', () => {
    cy.visit('http://localhost:3000/transactions/');
    cy.get('[data-cy=transaction_remove_btn]').eq(9).click();
    cy.get('[data-cy=transaction]').should('have.length', 9);
  });

  it('foutieve naam', () => {
    cy.visit('http://localhost:3000/transactions/add');

    cy.get('[data-cy=date_input]').type('2021-11-01');
    cy.get('[data-cy=place_input]').select('Irish Pub');
    cy.get('[data-cy=amount_input').type('5001');
    cy.get('[data-cy=submit_transaction').click();

    cy.get('[data-cy=labelinput-error').should('be.visible');
    cy.get('[data-cy=labelinput-error').eq(0).contains('Max value is 5000');
  });
});
