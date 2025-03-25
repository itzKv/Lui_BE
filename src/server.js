const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require('../src/routes');
const errorMiddleware = require("../src/middlewares/errorMiddleware");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json()); // Middleware for JSON Parsing
app.use(morgan("dev")); // Logging request to terminal

app.use("/api", routes); // Every routes will have prefix of '/api'

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});