const express = require("express");
const pool = require("./models/db");
require("dotenv").config();
const cors = require("cors");
const leadRoutes = require("./routes/leads");

//express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/", leadRoutes);

/*app.get("/", (req, res) => {
    res.send("<h1>worky 555</h1>");
})*/

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