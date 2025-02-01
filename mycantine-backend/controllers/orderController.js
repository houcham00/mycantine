// controllers/orderController.js
const Order = require("../models/Order");
const Menu = require("../models/Menu");

// Créer une commande
exports.createOrder = async (req, res) => {
  const { userId, items } = req.body;

  try {
    const menuItems = await Menu.find({ _id: { $in: items } });

    if (menuItems.length !== items.length) {
      return res
        .status(400)
        .json({ msg: "Un ou plusieurs plats sont invalides" });
    }

    const totalPrice = menuItems.reduce((total, item) => total + item.price, 0);

    // Met à jour la quantité pour les articles quantifiables
    menuItems.forEach(async (item) => {
      if (!item.isMeal && item.quantity > 0) {
        item.quantity -= 1; // Réduit la quantité des articles non repas
        await item.save();
      }
    });

    const order = new Order({ userId, items, totalPrice });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Récupérer toutes les commandes
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items").populate("userId");
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Mettre à jour le statut d'une commande
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ msg: "Commande non trouvée" });
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};
