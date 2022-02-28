const router = require("express").Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer();

router.get("/", postController.readPost);
router.post("/", postController.createPost);
router.put("/:uuid", postController.updatePost);
router.delete("/:uuid", postController.deletePost);

// a ajouter à la route post upload.single("file"),

// // comments
// router.patch("/comment-post/:id", postController.commentPost);
// router.patch("/edit-comment-post/:id", postController.editCommentPost);
// router.patch("/delete-comment-post/:id", postController.deleteCommentPost);

module.exports = router;
