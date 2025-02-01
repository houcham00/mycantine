// controllers/menuController.js
const Menu = require("../models/Menu");

// Récupérer tous les menus
exports.getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Ajouter un nouveau menu
exports.addMenu = async (req, res) => {
  const { name, description, price, available } = req.body;

  try {
    const newMenu = new Menu({ name, description, price, available });
    await newMenu.save();
    res.json(newMenu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Mettre à jour un menu
exports.updateMenu = async (req, res) => {
  const { name, description, price, available } = req.body;

  try {
    const menu = await Menu.findById(req.params.menuId);

    if (!menu) {
      return res.status(404).json({ msg: "Menu non trouvé" });
    }

    menu.name = name || menu.name;
    menu.description = description || menu.description;
    menu.price = price || menu.price;
    menu.available = available || menu.available;

    await menu.save();
    res.json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};
