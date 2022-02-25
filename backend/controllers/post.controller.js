const { User, Post } = require("../models");
const { uploadErrors } = require("../utils/errors.utils");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

// module.exports.readPost = (req, res) => {
//   PostModel.find((err, docs) => {
//     if (!err) res.send(docs);
//     else console.log("Error to get data : " + err);
//   }).sort({ createdAt: -1 });
// };

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
  // let fileName;

  // if (req.file !== null) {
  //   try {
  //     if (
  //       req.file.detectedMimeType != "image/jpg" &&
  //       req.file.detectedMimeType != "image/png" &&
  //       req.file.detectedMimeType != "image/jpeg"
  //     )
  //       throw Error("invalid file");

  //     if (req.file.size > 500000) throw Error("max size");
  //   } catch (err) {
  //     const errors = uploadErrors(err);
  //     return res.status(201).json({ errors });
  //   }
  //   fileName = req.body.posterId + Date.now() + ".jpg";

  //   await pipeline(
  //     req.file.stream,
  //     fs.createWriteStream(
  //       `${__dirname}/../client/public/uploads/posts/${fileName}`
  //     )
  //   );
  // }

  const { userUuid, message, picture, video } = req.body;
  try {
    const user = await User.findOne({ where: { uuid: userUuid } });
    const post = await Post.create({
      posterId: user.id,
      message,
      picture,
      // picture: req.file !== null ? "./uploads/posts/" + fileName : "",
      video,
    });
    return res.status(201).json(post);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

module.exports.updatePost = async (req, res) => {
  const uuid = req.params.uuid;
  const { message, picture, video } = req.body;
  try {
    const post = await Post.findOne({
      where: { uuid },
    });
    if (post.userUuid !== req.auth.userUuid) {
      res.status(401).json({ message: "Vous n'avez pas les droits !" });
    }
    post.message = message;
    post.picture = picture;
    post.video = video;

    await post.save();

    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports.deletePost = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const post = await Post.findOne({
      where: { uuid },
    });
    if (post.userUuid !== req.auth.userUuid) {
      res.status(401).json({ message: "Vous n'avez pas les droits !" });
    }
    await post.destroy();
    return res.json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
