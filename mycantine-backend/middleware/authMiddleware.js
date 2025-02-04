// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: "Aucun token trouvé, accès refusé" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    // Vérifier si l'utilisateur est un admin (ajoutez cette logique si nécessaire)
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Accès interdit" });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token invalide" });
  }
};
