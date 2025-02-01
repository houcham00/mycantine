// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getTransactions,
  updateTransactionStatus,
} = require("../controllers/paymentController");

// Route pour créer une transaction
router.post("/", createTransaction);

// Route pour récupérer toutes les transactions
router.get("/", getTransactions);

// Route pour mettre à jour le statut d'une transaction (ex: de "pending" à "completed")
router.put("/:transactionId/status", updateTransactionStatus);

module.exports = router;
