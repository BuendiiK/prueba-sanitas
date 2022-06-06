/// <reference types="cypress" />

describe('Test E2E Sanitas App', () => {
  let counter = 0;
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });

  // it('Aparece la barra de progreso y el mensaje', () => {
  //   // Create a Promise and capture a reference to its resolve
  //   // function so that we can resolve it when we want to:
  //   let sendResponse;
  //   const trigger = new Promise((resolve) => {
  //     sendResponse = resolve;
  //   });

  //   // Intercept requests to the URL we are loading data from and do not
  //   // let the response occur until our above Promise is resolved
  //   cy.intercept('/localhost', (request) => {
  //     return trigger.then(() => {
  //       request.reply();
  //     });
  //   });

  //   // Now visit the page and assert the loading spinner is shown
  //   cy.visit('http://localhost:55227/');

  //   cy.wait('@localhost');

  //   cy.get('.content-spinner')
  //     .should('exist')
  //     .then(() => {
  //       // After we've successfully asserted the loading spinner is
  //       // visible, call the resolve function of the above Promise
  //       // to allow the response to the data request to occur...
  //       sendResponse();
  //       // ...and assert the spinner is removed from the DOM and
  //       // the data is shown instead.
  //       cy.get('.content-spinner').should('not.exist');
  //     });
  // });

  it('Se visualizan los 4000 elementos', () => {
    cy.get('app-image').should('have.length', 4000);
  });

  it('Búsqueda por id', () => {
    cy.get('#search-input')
      .type('1000')
      .then(() => {
        cy.get('app-image').should('have.length', 1);
        const card = cy.get('img');
        card.should('have.id', '1000');
        card.should(
          'have.attr',
          'src',
          'https://picsum.photos/id/1000/500/500.jpg'
        );
      });
  });

  it('Búsqueda por texto', () => {
    cy.get('#search-input')
      .type('Lorem Ipsum')
      .then(() => {
        cy.get('app-image').should('have.length.below', 4000);
      });
  });

  it('Imagen no cargada', () => {
    cy.get('#search-input')
      .type('1664')
      .then(() => {
        const card = cy.get('img');
        card.should(
          'have.attr',
          'alt',
          ' La imagen 1664 no ha sido encontrada.'
        );
      });
  });

  it('No hay datos', () => {
    cy.get('#search-input')
      .type('qwerty')
      .then(() => {
        cy.get('#noData').should('be.visible');
      });
  });
});
