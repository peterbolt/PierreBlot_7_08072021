const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const { signUpErrors, signInErrors } = require("../utils/errors.utils");

const maxAge = 3 * 24 * 60 * 60 * 1000;

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const user = await User.create({
      pseudo,
      email,
      password: await bcrypt.hash(req.body.password, salt),
    });

    return res.status(201).json({ user: user.id });
  } catch (err) {
    const errors = signUpErrors(err);
    return res.status(200).json({ errors });
  }
};

// transformer en try/catch?
module.exports.signIn = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    const password_valid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (password_valid) {
      token = jwt.sign(
        { id: user.id, email: user.email, pseudo: user.pseudo },
        process.env.JWT_KEY_TOKEN,
        {
          expiresIn: maxAge,
        }
      );
      res.cookie("jwt", token, { httpOnly: true, maxAge });
      res.status(200).json({ token: token });
    } else {
      // const errors = signInErrors(err);
      res.status(400).json({ error: "Password Incorrect" });
    }
  } else {
    // const errors = signInErrors(err);
    res.status(404).json({ error: "User does not exist" });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
