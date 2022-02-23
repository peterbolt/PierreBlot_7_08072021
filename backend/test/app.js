const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./user.routes");
require("../config/config.json");
const { checkUser, requireAuth } = require("../middleware/auth.middleware");
const path = require("path"); // permet d'utiliser des fichiers
const helmet = require("helmet"); //  helps you secure your Express.js apps by setting various HTTP headers
const morgan = require("morgan"); // génère des logs pour chaque requête
const dotenv = require("dotenv");
const result = dotenv.config();
const cors = require("cors");

const app = express();

const client = require("redis").createClient(); //Redis is in-memory data structure store, used as a database, cache, and message broker
var limiter = require("express-limiter")(app, client); // limite le nombre de connexion à l'app

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet({ crossOriginResourcePolicy: false }));
// app.use("/images", express.static(path.join(__dirname, "images")));

// Limite la connexion par adresse IP
limiter({
  path: "/api",
  method: "get",
  lookup: ["connection.remoteAddress"],
  // 150 requests per hour
  total: 150,
  expire: 1000 * 60 * 60,
});

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// routes
app.get("/api", function (req, res) {
  res.send(200, "ok");
});
app.use("/api/user", userRoutes);

module.exports = app;
