const router = require("express").Router();
const multer = require("multer");
const upload = multer();

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user DB
router.get("/", userController.getAllUsers);
router.get("/:uuid", userController.userInfo);
router.put("/:uuid", userController.updateUser);
router.delete("/:uuid", userController.deleteUser);

// upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;
