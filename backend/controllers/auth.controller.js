const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY_TOKEN, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password, picture, admin } = req.body;

  try {
    const user = await User.create({ pseudo, email, password, picture, admin });

    return res.status(201).json(user);
  } catch (err) {
    const errors = signUpErrors(err);
    return res.status(500).json(errors);
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    console.log("erreur login");
    const token = createToken(user.id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ message: "User connected" });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(500).json(errors);
  }
};

// module.exports.logout = (req, res) => {
//   res.cookie("jwt", "", { maxAge: 1 });
//   res.redirect("/");
// };
