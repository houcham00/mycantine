// models/Menu.js
const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
  isMeal: { type: Boolean, default: false }, // True if it's a meal (non-quantifiable)
  quantity: { type: Number, default: 0 }, // For quantifiable items (like drinks, biscuits, etc.)
});

module.exports = mongoose.model("Menu", menuSchema);
