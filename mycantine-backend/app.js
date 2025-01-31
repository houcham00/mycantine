const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require('./db');
const authRoutes = require("./routes/authRoutes");
// const menuRoutes = require("./routes/menuRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/menus", menuRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/payments", paymentRoutes);

// Gestion des erreurs
// app.use(errorHandler);

// Connexion à MongoDB et démarrage du serveur
connectDB() // Utilisation de la fonction connectDB définie dans db.js
    .then(() => {
        console.log("Connecté à MongoDB !");
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Erreur de connexion à MongoDB :", err);
        process.exit(1); // Quitter l'application en cas d'erreur
    });