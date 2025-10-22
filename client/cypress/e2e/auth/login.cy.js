describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/auth');
    // Attendre que la page soit complètement chargée
    cy.get('form', { timeout: 30000 }).should('be.visible');
  });

  it('permet à un utilisateur de se connecter avec des identifiants valides', () => {
    const credentials = {
      email: 'testuser@example.com',
      password: 'Password123!'
    };

    // Vérifier qu'on est bien en mode login par défaut
    cy.get('button[type="submit"]').should('contain', 'Se connecter');

    // Remplir le formulaire
    cy.get('input[name="email"]').should('be.visible').clear().type(credentials.email);
    cy.get('input[name="password"]').should('be.visible').clear().type(credentials.password);
    
    // Soumettre le formulaire
    cy.get('button[type="submit"]').click();

    // Vérifier la redirection vers la page d'accueil
    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/');
  });

  it('permet de basculer vers le formulaire d\'inscription', () => {
    // Vérifier qu'on est en mode login
    cy.get('button[type="submit"]').should('contain', 'Se connecter');
    
    // Cliquer sur le bouton "Inscrivez-vous"
    cy.get('[data-testid="switch-to-register"]').should('be.visible').click();
    
    // Vérifier que le formulaire a changé
    cy.get('input[name="username"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', "S'inscrire");
    cy.get('[data-testid="switch-to-login"]').should('be.visible');
  });

  it('permet de basculer du formulaire d\'inscription vers connexion', () => {
    // Basculer vers inscription
    cy.get('[data-testid="switch-to-register"]').click();
    cy.get('input[name="username"]').should('be.visible');
    
    // Revenir à connexion
    cy.get('[data-testid="switch-to-login"]').should('be.visible').click();
    
    // Vérifier qu'on est revenu au mode login
    cy.get('input[name="username"]').should('not.exist');
    cy.get('button[type="submit"]').should('contain', 'Se connecter');
  });

  it('permet à un utilisateur de s\'inscrire avec succès', () => {
    const newUser = {
      username: 'Test User',
      email: 'newuser@example.com',
      password: 'Password123!'
    };

    // Basculer vers le mode inscription
    cy.get('[data-testid="switch-to-register"]').click();

    // Remplir le formulaire d'inscription
    cy.get('input[name="username"]').should('be.visible').type(newUser.username);
    cy.get('input[name="email"]').should('be.visible').type(newUser.email);
    cy.get('input[name="password"]').should('be.visible').type(newUser.password);
    
    // Soumettre le formulaire
    cy.get('button[type="submit"]').click();

    // Vérifier la redirection
    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/');
  });

  it('affiche une erreur avec des identifiants de connexion invalides', () => {
    const invalidCredentials = {
      email: 'invalid@example.com',
      password: 'wrongpassword'
    };

    // Remplir avec des identifiants invalides
    cy.get('input[name="email"]').type(invalidCredentials.email);
    cy.get('input[name="password"]').type(invalidCredentials.password);
    cy.get('button[type="submit"]').click();

    // Vérifier qu'un message d'erreur apparaît (toast)
    // Ajustez le sélecteur selon votre bibliothèque de toast (react-hot-toast)
    cy.get('[role="status"]', { timeout: 5000 }).should('exist');
    // ou
    cy.contains(/failed|erreur|incorrect/i, { timeout: 5000 }).should('exist');
  });

  it('empêche la soumission avec des champs vides en mode connexion', () => {
    // Essayer de soumettre sans remplir les champs
    cy.get('button[type="submit"]').click();

    // La page ne devrait pas rediriger
    cy.url().should('include', '/auth');
  });

  it('empêche la soumission avec des champs vides en mode inscription', () => {
    // Basculer vers inscription
    cy.get('[data-testid="switch-to-register"]').click();

    // Essayer de soumettre sans remplir les champs
    cy.get('button[type="submit"]').click();

    // La page ne devrait pas rediriger
    cy.url().should('include', '/auth');
  });

  it('valide le format de l\'email', () => {
    // Entrer un email invalide
    cy.get('input[name="email"]').type('emailinvalide');
    cy.get('input[name="password"]').type('Password123!');
    
    // Le navigateur devrait empêcher la soumission (validation HTML5)
    cy.get('button[type="submit"]').click();
    
    // Vérifier qu'on reste sur la page
    cy.url().should('include', '/auth');
  });
});