Voici la documentation détaillée des routes pour **MyCantine** :

---

## **API Documentation - MyCantine**

L'API **MyCantine** permet la gestion des menus, des commandes et des paiements dans une cantine universitaire. Les utilisateurs peuvent consulter les menus, passer des commandes pour des repas, et effectuer des paiements sécurisés. 

### **1. Routes d'Authentification**

#### **POST /api/auth/register**
- **Description** : Permet à un nouvel utilisateur de s'inscrire en créant un compte avec son nom, email, mot de passe et rôle.
- **Paramètres (body)** :
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123",
    "role": "student"  // "student", "vendor", or "admin"
  }
  ```
- **Réponse (succès)** :
  ```json
  {
    "token": "JWT_TOKEN"
  }
  ```
- **Réponse (erreur)** :
  - `400` : "Utilisateur déjà existant" (si l'email est déjà utilisé)
  - `500` : "Erreur du serveur"
  
#### **POST /api/auth/login**
- **Description** : Permet à un utilisateur de se connecter avec son email et mot de passe.
- **Paramètres (body)** :
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Réponse (succès)** :
  ```json
  {
    "token": "JWT_TOKEN"
  }
  ```
- **Réponse (erreur)** :
  - `400` : "Utilisateur non trouvé" ou "Mot de passe incorrect"
  - `500` : "Erreur du serveur"

---

### **2. Routes de Gestion des Menus**

#### **GET /api/menu**
- **Description** : Récupère tous les menus disponibles dans la cantine.
- **Réponse (succès)** :
  ```json
  [
    {
      "_id": "menuId1",
      "name": "Plat du jour",
      "description": "Un plat délicieux",
      "price": 10,
      "available": true,
      "isMeal": true,
      "quantity": 0  // Pour les articles quantifiables, sinon 0
    },
    ...
  ]
  ```

#### **POST /api/menu**
- **Description** : Ajoute un nouveau plat ou article au menu de la cantine. Ce plat peut être un repas ou un article quantifiable (ex. boisson, biscuit).
- **Paramètres (body)** :
  ```json
  {
    "name": "Boisson orange",
    "description": "Une boisson rafraîchissante",
    "price": 3,
    "available": true,
    "isMeal": false,  // `true` pour les repas, `false` pour les articles quantifiables
    "quantity": 100   // Nécessaire seulement pour les articles quantifiables
  }
  ```
- **Réponse (succès)** :
  ```json
  {
    "_id": "newMenuId",
    "name": "Boisson orange",
    "description": "Une boisson rafraîchissante",
    "price": 3,
    "available": true,
    "isMeal": false,
    "quantity": 100
  }
  ```
- **Réponse (erreur)** :
  - `400` : "Données invalides" (si les champs sont manquants ou mal formatés)
  - `500` : "Erreur du serveur"

#### **PUT /api/menu/:menuId**
- **Description** : Met à jour un plat ou article existant.
- **Paramètres (body)** :
  ```json
  {
    "name": "Boisson orange modifiée",
    "description": "Nouvelle boisson rafraîchissante",
    "price": 4,
    "available": true,
    "isMeal": false,
    "quantity": 80
  }
  ```
- **Réponse (succès)** :
  ```json
  {
    "_id": "menuId",
    "name": "Boisson orange modifiée",
    "description": "Nouvelle boisson rafraîchissante",
    "price": 4,
    "available": true,
    "isMeal": false,
    "quantity": 80
  }
  ```
- **Réponse (erreur)** :
  - `404` : "Menu non trouvé" (si le menu n'existe pas)
  - `500` : "Erreur du serveur"

---

### **3. Routes de Gestion des Commandes**

#### **POST /api/order**
- **Description** : Permet à un utilisateur de passer une commande en choisissant des repas et/ou des articles quantifiables.
- **Paramètres (body)** :
  ```json
  {
    "userId": "userId123",
    "items": ["menuId1", "menuId2"]  // Liste des IDs de menus ou articles choisis
  }
  ```
- **Réponse (succès)** :
  ```json
  {
    "_id": "orderId",
    "userId": "userId123",
    "items": ["menuId1", "menuId2"],
    "totalPrice": 13
  }
  ```
- **Réponse (erreur)** :
  - `400` : "Un ou plusieurs plats sont invalides" (si l'ID d'un plat n'existe pas)
  - `500` : "Erreur du serveur"

#### **GET /api/order**
- **Description** : Permet à un administrateur ou vendeur de récupérer toutes les commandes.
- **Réponse (succès)** :
  ```json
  [
    {
      "_id": "orderId1",
      "userId": "userId123",
      "items": ["menuId1", "menuId2"],
      "totalPrice": 13,
      "status": "pending"  // Statut de la commande
    },
    ...
  ]
  ```
  
#### **PUT /api/order/:orderId/status**
- **Description** : Permet de mettre à jour le statut d'une commande (ex. de "pending" à "completed").
- **Paramètres (body)** :
  ```json
  {
    "status": "completed"  // Peut être "pending", "completed", ou "cancelled"
  }
  ```
- **Réponse (succès)** :
  ```json
  {
    "_id": "orderId1",
    "userId": "userId123",
    "status": "completed"
  }
  ```
- **Réponse (erreur)** :
  - `404` : "Commande non trouvée" (si l'ID de la commande n'existe pas)
  - `500` : "Erreur du serveur"

---

### **4. Routes de Gestion des Paiements**

#### **POST /api/payment**
- **Description** : Crée une transaction de paiement pour une commande spécifique.
- **Paramètres (body)** :
  ```json
  {
    "orderId": "orderId123",
    "amount": 13,  // Montant total de la commande
    "status": "pending"  // Statut initial de la transaction
  }
  ```
- **Réponse (succès)** :
  ```json
  {
    "_id": "transactionId",
    "orderId": "orderId123",
    "amount": 13,
    "status": "pending"
  }
  ```
- **Réponse (erreur)** :
  - `404` : "Commande non trouvée" (si l'ID de la commande n'existe pas)
  - `500` : "Erreur du serveur"

#### **GET /api/payment**
- **Description** : Permet à un administrateur ou vendeur de récupérer toutes les transactions de paiement.
- **Réponse (succès)** :
  ```json
  [
    {
      "_id": "transactionId1",
      "orderId": "orderId123",
      "amount": 13,
      "status": "pending"
    },
    ...
  ]
  ```

#### **PUT /api/payment/:transactionId/status**
- **Description** : Met à jour le statut d'une transaction de paiement.
- **Paramètres (body)** :
  ```json
  {
    "status": "completed"  // Statut de la transaction (ex. "pending", "completed", "failed")
  }
  ```
- **Réponse (succès)** :
  ```json
  {
    "_id": "transactionId1",
    "orderId": "orderId123",
    "amount": 13,
    "status": "completed"
  }
  ```
- **Réponse (erreur)** :
  - `404` : "Transaction non trouvée" (si l'ID de la transaction n'existe pas)
  - `500` : "Erreur du serveur"

---

### **5. Middleware d'Authentification**

Toutes les routes qui nécessitent une authentification (par exemple, la gestion des commandes et des paiements) sont protégées par un middleware qui vérifie le **token JWT** envoyé dans l'en-tête **Authorization** des requêtes.

- Si le **token JWT** est valide, l'utilisateur est authentifié et la requête continue.
- Si le **token JWT** est manquant ou invalide, une erreur `401 Unauthorized` est renvoyée.

---

### Conclusion

Cette documentation couvre toutes les routes de l'API **MyCantine** et leur fonctionnement. Elle décrit la création et la gestion des utilisateurs, des menus, des commandes et des paiements dans la cantine universitaire. Les routes sont protégées par un middleware d'authentification JWT pour sécuriser les actions sensibles comme la gestion des commandes et des paiements.

Si tu as des questions supplémentaires ou besoin de plus de détails sur une route en particulier, n'hésite pas à demander !