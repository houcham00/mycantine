const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

// Routes
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// Middleware
const authMiddleware = require("./middleware/authMiddleware");

// Configurations
dotenv.config();

// Connexion à la base de données MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Pour parser les données JSON

// Routes publiques
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);

// Routes protégées
app.use("/api/order", authMiddleware, orderRoutes);
app.use("/api/payment", authMiddleware, paymentRoutes);

// Port d'écoute
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
