describe('transactions test', () => {
  it('show transactions', () => {
    cy.intercept(
      'GET',
      'http://localhost:9000/api/transactions',
      {
        fixture: 'transactions.json',
      },
    );

    cy.visit('http://localhost:3000');
    cy.get('[data-cy=transaction]').should('have.length', 1);
    cy.get('[data-cy=transaction_place]').eq(0).contains('Chinese Restaurant');
    cy.get('[data-cy=transaction_date]').eq(0).should('contain', '01/11/2021');
  });

  it('very slow response', () => {
    cy.intercept(
      'http://localhost:9000/api/transactions',
      (req) => {
        req.on('response', (res) => {
          res.setDelay(1000);
        });
      },
    ).as('slowResponse');
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=loading]').should('be.visible');
    cy.wait('@slowResponse');
    cy.get('[data-cy=loading]').should('not.exist');
  });

  it('check filter', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=transactions_search_input').type('Ir');
    cy.get('[data-cy=transactions_search_btn').click();
    cy.get('[data-cy=transaction').should('have.length', 3);
    cy.get('[data-cy=transaction_place]').each((el) => {
      expect(el[0].textContent).to.match(/Ir/);
    });
  });

  it('check empty filter', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=transactions_search_input').type('xyz');
    cy.get('[data-cy=transactions_search_btn').click();
    cy.get('[data-cy=transaction').should('have.length', 0);
    cy.get('[data-cy=transactions_error').should('not.exist');
  });

  it('error from backend', () => {
    cy.intercept(
      'GET',
      'http://localhost:9000/api/transactions',
      {
        statusCode: 500,
        body: {
          error: 'internal server error',
        },
      },
    );
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=transactions_search_input').type('Ir');
    cy.get('[data-cy=transactions_search_btn').click();
    cy.get('[data-cy=transaction').should('have.length', 0);
    cy.get('[data-cy=transactions_error').should('be.visible');
  });
});
