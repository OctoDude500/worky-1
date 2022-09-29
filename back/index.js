const express = require("express");
const pool = require("./models/db");
require("dotenv").config();
const cors = require("cors");
const leadRoutes = require("./routes/leads");
const userRoutes = require("./routes/user");
const bodyParser = require("body-parser");
//express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());
//this will let us take and parse http form data from the php page
//https://github.com/expressjs/body-parser#bodyparserurlencodedoptions
app.use(bodyParser.urlencoded({ extended: false }));

//---- routes -----
//test
/*app.post("/testing", async (req, res) => {
    console.log("is request from php", JSON.stringify(req.body))
    res.status(200).json({msg: "submission received"})
})*/
//user routes
app.use("/user", userRoutes);
//lead routes
app.use("/", leadRoutes);




const port = "34.125.52.138";

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