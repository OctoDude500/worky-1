const express = require("express");
const pool = require("./models/db");
require("dotenv").config();
const cors = require("cors");
const leadRoutes = require("./routes/leads");
const userRoutes = require("./routes/user");
//express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

//---- routes -----
//lead routes
app.use("/", leadRoutes);
//user routes
app.use("/user", userRoutes);

const port = 8000;

const start = async () => {
    try {
        await pool;
        console.log("DB connected...");
        app.listen(port, console.log("server has started..."));
    } catch (err) {
        console.error(err.message);
    }
}

start();