// controllers/paymentController.js
const Transaction = require("../models/Transaction");
const Order = require("../models/Order");

// Créer une transaction
exports.createTransaction = async (req, res) => {
  const { orderId, amount, status } = req.body;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ msg: "Commande non trouvée" });
    }

    const transaction = new Transaction({ orderId, amount, status });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Récupérer toutes les transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("orderId");
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Mettre à jour le statut d'une transaction
exports.updateTransactionStatus = async (req, res) => {
  const { transactionId } = req.params;
  const { status } = req.body;

  try {
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ msg: "Transaction non trouvée" });
    }

    transaction.status = status;
    await transaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};
