// controllers/paymentController.js
const Transaction = require("../models/Transaction");
const Order = require("../models/Order");
const { initiateRequestToPay } = require("../services/paymentService");

exports.createTransaction = async (req, res) => {
  const { orderId, amount } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ msg: "Commande non trouvée" });
    }

    // Lancer la RequestToPay via MoMo
    const paymentResponse = await initiateRequestToPay(amount, orderId);

    if (paymentResponse.status === "SUCCESS") {
      // Enregistrer la transaction en base
      const transaction = new Transaction({
        orderId,
        amount,
        status: "completed", // Ou "pending" si tu souhaites vérifier ultérieurement
      });
      await transaction.save();
      return res
        .status(201)
        .json({ transaction, referenceId: paymentResponse.referenceId });
    } else {
      return res
        .status(400)
        .json({ msg: "Paiement échoué", error: paymentResponse.error });
    }
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
