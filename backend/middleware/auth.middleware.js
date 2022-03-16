const jwt = require("jsonwebtoken");
const { User } = require("../models");
const dotenv = require("dotenv");
dotenv.config();

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_KEY_TOKEN, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await User.findByPk(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_KEY_TOKEN, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json("no token");
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log("No token");
  }
};
