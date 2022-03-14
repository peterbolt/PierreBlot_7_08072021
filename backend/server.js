const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
require("dotenv").config({ path: "./config/.env" });
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const { sequelize } = require("./models");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const cors = require("cors");

const app = express();

// var sqlinjection = require("sql-injection");
const client = require("redis").createClient();
var limiter = require("express-limiter")(app, client);

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
// app.use(sqlinjection);

// Limite la connexion par adresse IP
limiter({
  path: "/",
  method: "get",
  lookup: ["connection.remoteAddress"],
  // 150 requests per hour
  total: 150,
  expire: 1000 * 60 * 60,
});

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user.uuid);
});

// routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// server
app.listen(process.env.PORT, async () => {
  console.log(`Listening on port ${process.env.PORT}`);
  await sequelize.authenticate();
  console.log("Database Connected!");
});
