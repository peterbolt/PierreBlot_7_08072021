const { User, Comment } = require("../models");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const { updateErrors } = require("../utils/errors.utils");

module.exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
};

module.exports.userInfo = async (req, res) => {
  const userUuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid: userUuid },
      include: ["posts"],
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports.updateUser = async (req, res) => {
  const userUuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid: userUuid },
    });
    await user
      .update({ pseudo: req.body.pseudo })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }

  const { userId } = req.body;
  try {
    const comment = await Comment.findOne({
      where: { commenterId: userId },
    });
    await comment
      .update({ commenterPseudo: req.body.pseudo })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }

  try {
    const user = await User.findOne({
      where: { uuid: userUuid },
    });
    const salt = await bcrypt.genSalt(10);
    await user
      .update({
        password: await bcrypt.hash(req.body.password, salt),
      })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    const errors = updateErrors(err);
    return res.status(200).json({ errors });
  }
};

module.exports.deleteUser = async (req, res) => {
  const userUuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid: userUuid },
    });
    await user.destroy();
    return res.json({ message: "User deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
