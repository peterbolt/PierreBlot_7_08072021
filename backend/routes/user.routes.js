// défini les différentes routes de l'API pour les user avec les contrôles à appliquer
const router = require("express").Router();

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
// const password = require("../middleware/password");
// const email = require("../middleware/email");

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
// router.get("/logout", authController.logout);

// user DB
router.get("/", userController.getAllUsers);
router.get("/:uuid", userController.userInfo);
router.put("/:uuid", userController.updateUser);
router.delete("/:uuid", userController.deleteUser);

module.exports = router;
