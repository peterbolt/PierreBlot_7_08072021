const router = require("express").Router();
const postController = require("../controllers/post.controller");
const auth = require("../middleware/auth.middleware");
const multer = require("multer");
const upload = multer();

router.get("/", postController.readPost);
router.post("/", upload.single("file"), postController.createPost);
router.put("/:uuid", auth, postController.updatePost);
router.delete("/:uuid", auth, postController.deletePost);

// // comments
// router.patch("/comment-post/:id", postController.commentPost);
// router.patch("/edit-comment-post/:id", postController.editCommentPost);
// router.patch("/delete-comment-post/:id", postController.deleteCommentPost);

module.exports = router;
