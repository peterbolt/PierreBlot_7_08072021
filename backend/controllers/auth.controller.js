const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const { signUpErrors, signInErrors } = require("../utils/errors.utils");

module.exports.signUp = async (req, res) => {
  const { pseudo, email, picture, admin } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const user = await User.create({
      pseudo,
      email,
      password: await bcrypt.hash(req.body.password, salt),
      picture,
      admin,
    });

    return res.status(201).json(user);
  } catch (err) {
    const errors = signUpErrors(err);
    return res.status(500).json(errors);
  }
};

module.exports.signIn = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    const password_valid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (password_valid) {
      token = jwt.sign(
        { id: user.uuid, email: user.email, pseudo: user.pseudo },
        process.env.JWT_KEY_TOKEN,
        {
          expiresIn: "12h",
        }
      );
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

//____ login avec cookie à tester

// const login = async (email, password) => {
//   const user = await this.findOne({ email });
//   if (user) {
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//       return user;
//     }
//     throw Error("incorrect password");
//   }
//   throw Error("incorrect email");
// };

// const maxAge = 3 * 24 * 60 * 60 * 1000;

// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_KEY_TOKEN, {
//     expiresIn: maxAge,
//   });
// };

// module.exports.signIn = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await login(email, password);
//     const token = createToken(user.uuid);
//     res.cookie("jwt", token, { httpOnly: true, maxAge });
//     res.status(200).json({ user: user.id });
//   } catch (err) {
//     const errors = signInErrors(err);
//     res.status(200).json({ errors });
//   }
// };

// module.exports.logout = (req, res) => {
//   res.cookie("jwt", "", { maxAge: 1 });
//   res.redirect("/");
// };
