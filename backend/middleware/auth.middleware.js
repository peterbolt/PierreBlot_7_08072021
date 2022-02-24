const jwt = require("jsonwebtoken");
// const { User } = require("../models");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);
    const userUuid = decodedToken.userUuid;
    req.auth = { userUuid };
    if (req.body.userUuid && req.body.userUuid !== userUuid) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

// module.exports.requireAuth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, process.env.JWT_KEY_TOKEN, async (err, decodedToken) => {
//       if (err) {
//         console.log(err);
//         res.send(200).json("no token");
//       } else {
//         console.log(decodedToken.id);
//         next();
//       }
//     });
//   } else {
//     console.log("No token");
//   }
// };
