// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

// Route pour créer une commande
router.post("/", createOrder);

// Route pour récupérer toutes les commandes
router.get("/", getOrders);

// Route pour mettre à jour le statut d'une commande (ex: de "pending" à "completed")
router.put("/:orderId/status", updateOrderStatus);

module.exports = router;
