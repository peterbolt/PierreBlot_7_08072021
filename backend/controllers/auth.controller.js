const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const { signUpErrors, signInErrors } = require("../utils/errors.utils");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY_TOKEN, {
    expiresIn: maxAge,
  });
};

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

module.exports.signIn = async (req, res) => {
  login = async function (email, password) {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        return user;
      }
      throw Error("incorrect password");
    }
    throw Error("incorrect email");
  };

  const { email, password } = req.body;

  try {
    const user = await login(email, password);
    const token = createToken(user.id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ token });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
