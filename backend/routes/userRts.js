// défini les différentes routes de l'API pour les user avec les contrôles à appliquer
const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/userCtrlr");
const password = require("../middleware/password");
const email = require("../middleware/email");

router.post("/signup", password, email, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
