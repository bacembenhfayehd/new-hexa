describe('OrderSummary - Processus de commande', () => {
  beforeEach(() => {
    // Se connecter d'abord
    cy.visit('/auth');
    cy.get('form', { timeout: 30000 }).should('be.visible');
    
    // Login
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('Password123!');
    cy.contains('button', 'Se connecter').click();
    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/');

    // Ajouter des produits au panier
    cy.visit('/products'); // Ou la page où se trouvent les produits
    cy.get('[data-testid="add-to-cart"]').first().click();
    
    // Aller au panier
    cy.visit('/cart');
    cy.get('[data-testid="order-summary"]', { timeout: 10000 }).should('be.visible');
  });

  describe('Affichage initial', () => {
    it('affiche le titre et les sections principales', () => {
      cy.contains('Détails de la commande').should('be.visible');
      cy.contains('Type de livraison').should('be.visible');
      cy.contains('Téléphone').should('be.visible');
      cy.contains('Articles').should('be.visible');
    });

    it('le bouton de commande est désactivé par défaut', () => {
      cy.contains('button', 'Demander un devis')
        .should('be.visible')
        .and('be.disabled')
        .and('have.class', 'bg-gray-400');
    });

    it('affiche le nombre d\'articles dans le panier', () => {
      cy.contains('Articles').parent().within(() => {
        cy.get('p').last().should('not.be.empty');
      });
    });
  });

  describe('Sélection du type de livraison', () => {
    it('affiche les options de livraison', () => {
      // Cliquer sur le dropdown
      cy.contains('Sélectionner le type de livraison').click();
      
      // Vérifier les options
      cy.contains('Livraison à domicile').should('be.visible');
      cy.contains('Retrait en magasin').should('be.visible');
    });

    it('permet de sélectionner "Livraison à domicile"', () => {
      cy.contains('Sélectionner le type de livraison').click();
      cy.contains('Livraison à domicile').click();
      
      // Vérifier que la sélection est affichée
      cy.contains('Livraison à domicile').should('be.visible');
      
      // Vérifier que les champs supplémentaires apparaissent
      cy.contains('Adresse').should('be.visible');
      cy.contains('Mode de paiement').should('be.visible');
    });

    it('permet de sélectionner "Retrait en magasin"', () => {
      cy.contains('Sélectionner le type de livraison').click();
      cy.contains('Retrait en magasin').click();
      
      // Vérifier la sélection
      cy.contains('Retrait en magasin').should('be.visible');
      
      // Vérifier que les champs d'adresse et paiement ne sont PAS visibles
      cy.contains('Adresse').should('not.exist');
      cy.contains('Mode de paiement').should('not.exist');
    });
  });

  describe('Formulaire de livraison à domicile', () => {
    beforeEach(() => {
      // Sélectionner livraison à domicile
      cy.contains('Sélectionner le type de livraison').click();
      cy.contains('Livraison à domicile').click();
    });

    it('affiche le champ adresse', () => {
      cy.contains('Adresse').should('be.visible');
      cy.contains('button', 'Addresse').should('be.visible');
    });

    it('permet d\'ajouter une nouvelle adresse', () => {
      // Cliquer sur le dropdown d'adresse
      cy.contains('button', 'Addresse').click();
      
      // Cliquer sur "Ajouter votre adresse"
      cy.contains('+ Ajouter votre adresse').click();
      
      // Vérifier la redirection vers la page d'ajout d'adresse
      cy.url().should('include', '/add-address');
    });

    it('affiche les options de paiement', () => {
      cy.contains('Mode de paiement').should('be.visible');
      cy.contains('Paiement à la livraison').should('be.visible');
      cy.contains('Virement bancaire').should('be.visible');
    });

    it('permet de sélectionner un mode de paiement', () => {
      // Sélectionner "Paiement à la livraison"
      cy.get('input[value="cash_on_delivery"]').check();
      cy.get('input[value="cash_on_delivery"]').should('be.checked');
      
      // Sélectionner "Virement bancaire"
      cy.get('input[value="bank_transfer"]').check();
      cy.get('input[value="bank_transfer"]').should('be.checked');
      cy.get('input[value="cash_on_delivery"]').should('not.be.checked');
    });
  });

  describe('Champ téléphone', () => {
    it('permet de saisir un numéro de téléphone', () => {
      const phoneNumber = '+213 55 123 4567';
      
      cy.get('input[placeholder="+213 XX XXX XXX"]')
        .should('be.visible')
        .clear()
        .type(phoneNumber)
        .should('have.value', phoneNumber);
    });

    it('conserve le numéro saisi lors du changement de type de livraison', () => {
      const phoneNumber = '+213 55 123 4567';
      
      // Saisir le téléphone
      cy.get('input[placeholder="+213 XX XXX XXX"]').type(phoneNumber);
      
      // Changer le type de livraison
      cy.contains('Sélectionner le type de livraison').click();
      cy.contains('Retrait en magasin').click();
      
      // Vérifier que le téléphone est toujours là
      cy.get('input[placeholder="+213 XX XXX XXX"]').should('have.value', phoneNumber);
    });
  });

  describe('Validation du formulaire', () => {
    it('désactive le bouton si aucun type de livraison n\'est sélectionné', () => {
      cy.get('input[placeholder="+213 XX XXX XXX"]').type('+213 55 123 4567');
      
      cy.contains('button', 'Demander un devis')
        .should('be.disabled')
        .and('have.class', 'bg-gray-400');
    });

    it('désactive le bouton si le téléphone est vide', () => {
      // Sélectionner retrait en magasin (pas besoin d'adresse)
      cy.contains('Sélectionner le type de livraison').click();
      cy.contains('Retrait en magasin').click();
      
      cy.contains('button', 'Demander un devis')
        .should('be.disabled')
        .and('have.class', 'bg-gray-400');
    });

    it('active le bouton pour "Retrait en magasin" avec téléphone', () => {
      // Sélectionner retrait en magasin
      cy.contains('Sélectionner le type de livraison').click();
      cy.contains('Retrait en magasin').click();
      
      // Saisir le téléphone
      cy.get('input[placeholder="+213 XX XXX XXX"]').type('+213 55 123 4567');
      
      cy.contains('button', 'Demander un devis')
        .should('not.be.disabled')
        .and('have.class', 'bg-green-600');
    });

    it('désactive le bouton pour "Livraison" si adresse manquante', () => {
      // Sélectionner livraison
      cy.contains('Sélectionner le type de livraison').click();
      cy.contains('Livraison à domicile').click();
      
      // Saisir téléphone et mode de paiement
      cy.get('input[placeholder="+213 XX XXX XXX"]').type('+213 55 123 4567');
      cy.get('input[value="cash_on_delivery"]').check();
      
      // Le bouton devrait être désactivé car pas d'adresse
      cy.contains('button', 'Demander un devis')
        .should('be.disabled');
    });

    it('désactive le bouton pour "Livraison" si mode de paiement manquant', () => {
      // Note: Ce test nécessite qu'une adresse soit déjà configurée
      // Vous devrez peut-être mocker cette partie
      
      cy.contains('Sélectionner le type de livraison').click();
      cy.contains('Livraison à domicile').click();
      cy.get('input[placeholder="+213 XX XXX XXX"]').type('+213 55 123 4567');
      
      // Sans sélectionner le mode de paiement
      cy.contains('button', 'Demander un devis')
        .should('be.disabled');
    });
  });

  describe('Création de commande', () => {
    it('crée une commande avec succès - Retrait en magasin', () => {
      // Intercepter la requête de création de commande
      cy.intercept('POST', '**/api/orders', {
        statusCode: 200,
        body: {
          success: true,
          data: {
            orderId: '12345',
            status: 'pending'
          }
        }
      }).as('createOrder');

      // Remplir le formulaire
      cy.contains('Sélectionner le type de livraison').click();
      cy.contains('Retrait en magasin').click();
      cy.get('input[placeholder="+213 XX XXX XXX"]').type('+213 55 123 4567');
      
      // Soumettre
      cy.contains('button', 'Demander un devis').click();
      
      // Vérifier la requête
      cy.wait('@createOrder').then((interception) => {
        expect(interception.request.body).to.have.property('deliveryType', 'pickup');
        expect(interception.request.body).to.have.property('phone');
        expect(interception.request.body).to.have.property('items');
      });
      
      // Vérifier le toast de succès
      cy.contains('Commande créée avec succès', { timeout: 5000 }).should('be.visible');
    });

    it('affiche le toast de confirmation pour conserver les infos', () => {
      cy.intercept('POST', '**/api/orders', {
        statusCode: 200,
        body: {
          success: true,
          data: { orderId: '12345' }
        }
      }).as('createOrder');

      // Créer la commande
      cy.contains('Sélectionner le type de livraison').click();
      cy.contains('Retrait en magasin').click();
      cy.get('input[placeholder="+213 XX XXX XXX"]').type('+213 55 123 4567');
      cy.contains('button', 'Demander un devis').click();
      
      cy.wait('@createOrder');
      
      // Attendre le toast de confirmation
      cy.contains('Informations de commande', { timeout: 12000 }).should('be.visible');
      cy.contains('Souhaitez-vous conserver vos informations').should('be.visible');
      cy.contains('button', 'Conserver').should('be.visible');
      cy.contains('button', 'Effacer').should('be.visible');
    });

    it('permet de conserver les informations après commande', () => {
      cy.intercept('POST', '**/api/orders', {
        statusCode: 200,
        body: { success: true, data: { orderId: '12345' } }
      }).as('createOrder');

      const phoneNumber = '+213 55 123 4567';
      
      cy.contains('Sélectionner le type de livraison').click();
      cy.contains('Retrait en magasin').click();
      cy.get('input[placeholder="+213 XX XXX XXX"]').type(phoneNumber);
      cy.contains('button', 'Demander un devis').click();
      
      cy.wait('@createOrder');
      
      // Cliquer sur "Conserver"
      cy.contains('button', 'Conserver', { timeout: 12000 }).click();
      
      // Les infos devraient être conservées (vérifier avec localStorage ou en créant une nouvelle commande)
      cy.get('input[placeholder="+213 XX XXX XXX"]').should('have.value', phoneNumber);
    });

    it('permet d\'effacer les informations après commande', () => {
      cy.intercept('POST', '**/api/orders', {
        statusCode: 200,
        body: { success: true, data: { orderId: '12345' } }
      }).as('createOrder');

      cy.contains('Sélectionner le type de livraison').click();
      cy.contains('Retrait en magasin').click();
      cy.get('input[placeholder="+213 XX XXX XXX"]').type('+213 55 123 4567');
      cy.contains('button', 'Demander un devis').click();
      
      cy.wait('@createOrder');
      
      // Cliquer sur "Effacer"
      cy.contains('button', 'Effacer', { timeout: 12000 }).click();
      
      // Les champs devraient être vidés
      cy.get('input[placeholder="+213 XX XXX XXX"]').should('have.value', '');
    });

    it('affiche une erreur si la création échoue', () => {
      cy.intercept('POST', '**/api/orders', {
        statusCode: 400,
        body: {
          success: false,
          message: 'Stock insuffisant'
        }
      }).as('createOrder');

      cy.contains('Sélectionner le type de livraison').click();
      cy.contains('Retrait en magasin').click();
      cy.get('input[placeholder="+213 XX XXX XXX"]').type('+213 55 123 4567');
      cy.contains('button', 'Demander un devis').click();
      
      cy.wait('@createOrder');
      
      // Vérifier le message d'erreur
      cy.contains('Stock insuffisant', { timeout: 5000 }).should('be.visible');
    });

    it('affiche une erreur si les champs requis sont manquants', () => {
      // Essayer de soumettre sans remplir
      cy.contains('Sélectionner le type de livraison').click();
      cy.contains('Livraison à domicile').click();
      
      // Forcer le clic même si désactivé (pour tester la validation)
      cy.contains('button', 'Demander un devis').click({ force: true });
      
      // Vérifier le toast d'erreur
      cy.contains('Veuillez remplir tous les champs requis', { timeout: 5000 })
        .should('be.visible');
    });

    it('désactive le bouton pendant la création', () => {
      cy.intercept('POST', '**/api/orders', (req) => {
        // Retarder la réponse pour tester l'état de chargement
        req.reply((res) => {
          res.delay = 2000;
          res.send({ success: true, data: { orderId: '12345' } });
        });
      }).as('createOrder');

      cy.contains('Sélectionner le type de livraison').click();
      cy.contains('Retrait en magasin').click();
      cy.get('input[placeholder="+213 XX XXX XXX"]').type('+213 55 123 4567');
      cy.contains('button', 'Demander un devis').click();
      
      // Vérifier le texte de chargement
      cy.contains('Création en cours...').should('be.visible');
      cy.contains('button', 'Création en cours...').should('be.disabled');
    });
  });

  describe('Flux complet de commande', () => {
    it('permet de créer une commande complète avec livraison', () => {
      // 1. Ajouter une adresse d'abord
      cy.visit('/add-address');
      cy.get('input[name="city"]').type('Tunis');
      cy.get('input[name="street"]').type('Avenue Habib Bourguiba');
      cy.get('input[name="postalCode"]').type('1000');
      cy.contains('button', 'Enregistrer').click();
      
      // 2. Retourner au panier
      cy.visit('/cart');
      
      // 3. Remplir le formulaire de commande
      cy.contains('Sélectionner le type de livraison').click();
      cy.contains('Livraison à domicile').click();
      
      // Sélectionner l'adresse
      cy.contains('button', 'Addresse').click();
      cy.contains('Tunis Avenue Habib Bourguiba').click();
      
      // Sélectionner le mode de paiement
      cy.get('input[value="cash_on_delivery"]').check();
      
      // Saisir le téléphone
      cy.get('input[placeholder="+213 XX XXX XXX"]').type('+213 55 123 4567');
      
      // 4. Créer la commande
      cy.intercept('POST', '**/api/orders').as('createOrder');
      cy.contains('button', 'Demander un devis').click();
      
      cy.wait('@createOrder');
      cy.contains('Commande créée avec succès').should('be.visible');
    });
  });
});