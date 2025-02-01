// routes/menuRoutes.js
const express = require("express");
const router = express.Router();
const { getAllMenus, addMenu } = require("../controllers/menuController");

router.get("/", getAllMenus);
router.post("/", addMenu);

module.exports = router;
