const express = require("express");
const cors = require("cors");

if (![process.env.NODE_ENV, process.env.APP_ENV].includes("production"))
  require("dotenv").config({ path: "./config/environments/.env" });
const { appConfig } = require("./config/config");

const logger = require("./logger");

// Database Connection
const connectDatabase = require("./config/database");
connectDatabase();

// Routes
const userRoute = require("./routes/api/user");
const authRoute = require("./routes/api/auth");
const recipeRoute = require("./routes/api/recipe");

const app = express();

// Enable CORS
app.use(cors());

// Init Middleware
app.use(express.json({ extended: false }));

// Server Check
app.get("/", (req, res) => res.send("API Running"));

// Register Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/recipe", recipeRoute);

// Server Port Configuration
const PORT = appConfig.port;
app.listen(PORT, () => {
  console.log(`APP MODE => [${process.env.NODE_ENV ?? process.env.APP_ENV}]`);
  console.log(`SERVER PORT => [${PORT}]`);
});
