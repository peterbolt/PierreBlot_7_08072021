const { Post } = require("../models");
const { uploadErrors } = require("../utils/errors.utils");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.readPost = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: "user",
    });
    return res.json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports.createPost = async (req, res) => {
  let fileName;

  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    fileName = parseInt(req.body.posterId, 10) + Date.now() + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../../frontend/client/public/uploads/posts/${fileName}`
      )
    );
  }

  const newPost = await Post.create({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file !== null ? "./uploads/posts/" + fileName : "",
    video: req.body.video,
  });
  // const { posterId, message, video } = req.body;
  try {
    // const user = await User.findOne({ where: { uuid: userUuid } });
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

module.exports.updatePost = async (req, res) => {
  const postUuid = req.params.uuid;
  try {
    const post = await Post.findOne({
      where: { uuid: postUuid },
    });
    if (!postUuid) return res.status(400).send("ID unknown : " + postUuid);
    // if (post.posterId !== parseInt(req.body.userId)) {
    //   res.status(401).json({ message: "Vous n'avez pas les droits !" });
    // }
    post.message = req.body.message;
    await post
      .save()
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));

    // return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  console.log(req.params);
  try {
    const post = await Post.findOne({
      where: { id: postId },
    });
    if (!postId) return res.status(400).send("ID unknown : " + postId);
    console.log(post);
    await post.destroy();
    return res.json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
