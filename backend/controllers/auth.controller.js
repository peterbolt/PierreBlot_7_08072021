const { User } = require("../models");
// const jwt = require("jsonwebtoken");
// const { signUpErrors, signInErrors } = require("../utils/errors.utils");

// const maxAge = 3 * 24 * 60 * 60 * 1000;

// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_KEY_TOKEN, {
//     expiresIn: maxAge,
//   });
// };

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password, picture, admin } = req.body;

  try {
    const user = await User.create({ pseudo, email, password, picture, admin });

    return res.status(201).json(user);
  } catch (err) {
    // const errors = signUpErrors(err);
    return res.status(500).json(err);
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    // const token = createToken(user._id);
    // res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    // const errors = signInErrors(err);
    res.status(200).json({ err });
  }
};

// module.exports.logout = (req, res) => {
//   res.cookie("jwt", "", { maxAge: 1 });
//   res.redirect("/");
// };
