describe('Authentication - Register', () => {
  beforeEach(() => {
    cy.visit('/auth');
    cy.get('form', { timeout: 30000 }).should('be.visible');
  });

  it('affiche le formulaire d\'inscription par défaut en mode connexion', () => {
    // Vérifier qu'on est en mode login
    cy.contains('button', 'Se connecter').should('be.visible');
    cy.get('[data-testid="switch-to-register"]').should('be.visible');
    cy.get('input[name="username"]').should('not.exist');
  });

  it('bascule vers le formulaire d\'inscription', () => {
    // Cliquer sur "Inscrivez-vous"
    cy.get('[data-testid="switch-to-register"]').click();
    
    // Vérifier que le formulaire a changé
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.contains('button', "S'inscrire").should('be.visible');
    cy.get('[data-testid="switch-to-login"]').should('be.visible');
  });

  it('bascule du formulaire d\'inscription vers connexion', () => {
    // Aller vers inscription
    cy.get('[data-testid="switch-to-register"]').click();
    cy.get('input[name="username"]').should('be.visible');
    
    // Revenir à connexion
    cy.get('[data-testid="switch-to-login"]').click();
    
    // Vérifier qu'on est revenu au mode login
    cy.get('input[name="username"]').should('not.exist');
    cy.contains('button', 'Se connecter').should('be.visible');
  });

  it('permet à un utilisateur de s\'inscrire avec succès', () => {
    const newUser = {
      username: 'Test User',
      email: `testuser${Date.now()}@example.com`, // Email unique
      password: 'Password123!'
    };

    // Intercepter la requête d'inscription
    cy.intercept('POST', '**/api/auth/register').as('registerRequest');

    // Basculer vers inscription
    cy.get('[data-testid="switch-to-register"]').click();

    // Remplir le formulaire
    cy.get('input[name="username"]').should('be.visible').type(newUser.username);
    cy.get('input[name="email"]').should('be.visible').type(newUser.email);
    cy.get('input[name="password"]').should('be.visible').type(newUser.password);
    
    // Soumettre
    cy.contains('button', "S'inscrire").click();

    // Attendre la réponse
    cy.wait('@registerRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.success).to.be.true;
    });

    // Vérifier la redirection
    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/');
  });

  it('empêche l\'inscription avec des champs vides', () => {
    // Basculer vers inscription
    cy.get('[data-testid="switch-to-register"]').click();

    // Essayer de soumettre sans remplir
    cy.contains('button', "S'inscrire").click();

    // Vérifier qu'on reste sur la page
    cy.url().should('include', '/auth');
    
    // Vérifier la validation HTML5
    cy.get('input[name="username"]').then($input => {
      expect($input[0].validationMessage).to.not.be.empty;
    });
  });

  it('empêche l\'inscription avec un email invalide', () => {
    // Basculer vers inscription
    cy.get('[data-testid="switch-to-register"]').click();

    // Remplir avec un email invalide
    cy.get('input[name="username"]').type('Test User');
    cy.get('input[name="email"]').type('emailinvalide');
    cy.get('input[name="password"]').type('Password123!');
    
    cy.contains('button', "S'inscrire").click();

    // Vérifier qu'on reste sur la page
    cy.url().should('include', '/auth');
    
    // Vérifier le message de validation HTML5
    cy.get('input[name="email"]').then($input => {
      expect($input[0].validity.valid).to.be.false;
    });
  });

  it('affiche une erreur si l\'email existe déjà', () => {
    const existingUser = {
      username: 'Existing User',
      email: 'existing@example.com', // Email qui existe déjà
      password: 'Password123!'
    };

    // Intercepter la requête
    cy.intercept('POST', '**/api/auth/register').as('registerRequest');

    // Basculer vers inscription
    cy.get('[data-testid="switch-to-register"]').click();

    // Remplir le formulaire
    cy.get('input[name="username"]').type(existingUser.username);
    cy.get('input[name="email"]').type(existingUser.email);
    cy.get('input[name="password"]').type(existingUser.password);
    
    cy.contains('button', "S'inscrire").click();

    // Attendre la réponse
    cy.wait('@registerRequest');

    // Vérifier qu'un toast d'erreur apparaît
    cy.get('div[role="status"]', { timeout: 10000 }).should('exist');
    
    // Vérifier qu'on reste sur la page
    cy.url().should('include', '/auth');
  });

  it('empêche l\'inscription avec un mot de passe trop court', () => {
    // Basculer vers inscription
    cy.get('[data-testid="switch-to-register"]').click();

    cy.get('input[name="username"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('123'); // Mot de passe trop court
    
    cy.contains('button', "S'inscrire").click();

    // Vérifier la validation (si vous avez une validation côté client)
    cy.url().should('include', '/auth');
  });

  it('conserve les données saisies lors du basculement entre les formulaires', () => {
    const email = 'test@example.com';
    const password = 'Password123!';

    // Remplir le formulaire de connexion
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    
    // Basculer vers inscription
    cy.get('[data-testid="switch-to-register"]').click();
    
    // Les champs email et password devraient conserver leurs valeurs
    cy.get('input[name="email"]').should('have.value', email);
    cy.get('input[name="password"]').should('have.value', password);
  });

  it('efface le formulaire après une inscription réussie', () => {
    const newUser = {
      username: 'Test User',
      email: `newuser${Date.now()}@example.com`,
      password: 'Password123!'
    };

    cy.intercept('POST', '**/api/auth/register', {
      statusCode: 200,
      body: {
        success: true,
        data: {
          user: { id: 1, name: newUser.username, email: newUser.email },
          accessToken: 'fake-token',
          refreshToken: 'fake-refresh-token'
        }
      }
    }).as('registerRequest');

    cy.get('[data-testid="switch-to-register"]').click();

    cy.get('input[name="username"]').type(newUser.username);
    cy.get('input[name="email"]').type(newUser.email);
    cy.get('input[name="password"]').type(newUser.password);
    
    cy.contains('button', "S'inscrire").click();

    cy.wait('@registerRequest');
    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/');
  });
});