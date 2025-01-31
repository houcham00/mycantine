const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// POST /api/auth/register → Créer un compte
router.post("/register", authController.register);

// POST /api/auth/login → Connexion
router.post("/login", authController.login);

module.exports = router;