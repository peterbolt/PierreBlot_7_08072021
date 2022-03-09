const router = require("express").Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer();

router.get("/", postController.readPost);
router.post("/", upload.single("file"), postController.createPost);
router.put("/:uuid", postController.updatePost);
router.delete("/:id", postController.deletePost);

// comments
router.get("/comments", postController.readComment);
router.post("/comment-post/:postId", postController.commentPost);
router.put("/edit-comment-post/:id", postController.editCommentPost);
router.delete("/delete-comment-post/:id", postController.deleteCommentPost);

module.exports = router;
