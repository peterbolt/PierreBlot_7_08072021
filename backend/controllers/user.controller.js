const { User } = require("../models");

module.exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
  // try {
  //   const users = await User.findAll();
  //   return res.json(users);
  // } catch (err) {
  //   console.log(err);
  //   return res.status(500).json({ error: "Something went wrong" });
  // }
};

module.exports.userInfo = async (req, res) => {
  const userUuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid: userUuid },
      include: "posts",
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports.updateUser = async (req, res) => {
  const userUuid = req.params.uuid;
  const { pseudo } = req.body;
  try {
    const user = await User.findOne({
      where: { uuid: userUuid },
    });
    user.pseudo = pseudo;

    await user
      .save()
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
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
