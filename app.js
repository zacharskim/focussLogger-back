const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const focusTimes = require("./controllers/focusTimes");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/", focusTimes);

module.exports = app;
