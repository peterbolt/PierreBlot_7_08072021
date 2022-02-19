const { User } = require("../models");
const bcrypt = require("bcrypt"); // crypte le mdp user
const jwt = require("jsonwebtoken"); // utilisation des tokens
const dotenv = require("dotenv"); // pour utiliser les variables d'environnement
const result = dotenv.config();

// const User = require("../models/user");

exports.signup = (req, res, next) => {
  models.User.findOne({
    attributes: ["email"],
    where: { email: email },
  })
    .then((userFound) => {
      if (!userFound) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          const newUser = models.User.create({
            email: req.body.email,
            username: req.body.username,
            password: hash,
            bio: req.body.bio,
            isAdmin: 0,
          })
            .save()
            .then((newUser) => {
              res
                .status(201)
                .json({ message: "Utilisateur créé !"`${user.id}` });
            })
            .catch((err) => res.status(400).json({ error }));
        });
      } else {
        return res.status(409).json({ error: "User already exist" });
      }
    })
    .catch((error) => res.status(500).json({ error: "Unable to verify user" }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              `${process.env.JWT_KEY_TOKEN}`,
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
