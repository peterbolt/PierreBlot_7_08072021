const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const { signUpErrors, signInErrors } = require("../utils/errors.utils");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (userId, userAdmin) => {
  return jwt.sign({ id: userId, admin: userAdmin }, process.env.JWT_KEY_TOKEN, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  validPseudo = async function (pseudo) {
    // const pseudoRegex = /^(?=.*[a-z])(?=.*[A-Z]).{3,36}*$/;
    // const valid = await pseudo.match(pseudoRegex);
    if (pseudo.length >= 3) {
      return pseudo;
    }
    throw Error("incorrect pseudo");
  };

  validEmail = async function (email) {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = await email.match(emailRegex);
    if (valid) {
      return email;
    }
    throw Error("incorrect email");
  };

  validPassword = async function (password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,255}$/;
    const valid = await password.match(passwordRegex);
    if (valid) {
      return password;
    }
    throw Error("incorrect password");
  };

  const { pseudo, email, password } = req.body;
  try {
    console.log(req.body.password);
    let pseudo = await validPseudo(req.body.pseudo);
    let email = await validEmail(req.body.email);
    const findUser = await User.findOne({ where: { email } });
    if (!findUser) {
      let validUserPassword = await validPassword(req.body.password);
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(validUserPassword, salt);
      const user = await User.create({
        pseudo,
        email,
        password,
      });
      res.status(201).json({ user: user.id });
    }
    throw Error("email existant");
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).json({ errors });
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
    const token = createToken(user.id, user.admin);
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
