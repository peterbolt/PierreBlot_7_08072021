const express = require("express");
const { sequelize } = require("./models");
const userRoutes = require("./routes/user.routes");
// const { checkUser, requireAuth } = require("./middleware/auth.middleware");

const app = express();
app.use(express.json());

// routes
app.use("/users", userRoutes);

// server
app.listen({ port: 3000 }, async () => {
  console.log("Listening on port 3000");
  await sequelize.authenticate();
  console.log("Database Connected!");
});

// const http = require("http");
// const app = require("./test/app");

// const normalizePort = (val) => {
//   const port = parseInt(val, 10);

//   if (isNaN(port)) {
//     return val;
//   }
//   if (port >= 0) {
//     return port;
//   }
//   return false;
// };
// const port = normalizePort(process.env.PORT || "3000");
// app.set("port", port);

// const errorHandler = (error) => {
//   if (error.syscall !== "listen") {
//     throw error;
//   }
//   const address = server.address();
//   const bind =
//     typeof address === "string" ? "pipe " + address : "port: " + port;
//   switch (error.code) {
//     case "EACCES":
//       console.error(bind + " requires elevated privileges.");
//       process.exit(1);
//       break;
//     case "EADDRINUSE":
//       console.error(bind + " is already in use.");
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// };

// const server = http.createServer(app);

// server.on("error", errorHandler);
// server.on("listening", async () => {
//   const address = server.address();
//   const bind =
//     typeof address === "string"
//       ? "pipe " + address
//       : "port " + "http://localhost:" + port;
//   console.log("Listening on " + bind);
//   await sequelize.sync({ alter: true });
// });

// server.listen(port);
