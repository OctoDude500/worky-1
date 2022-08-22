const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const pool = require("./db/db");
const { v4: uuidv4 } = require("uuid");

// middleware
app.use(cors());
app.use(express.json());

// --- get all transactions ---
app.get("/", async (req, res) => {
    try {
        const getLeads = await pool.query(
        " SELECT applicant.applicant_id, " +
            "name, " +
            "email, " +
            "phone, " +
            "language, " +
            "workplace, " +
            "attempts, " +
            "location, " +
            "timestamp, " +
            "details_id, " +
            "comment, " +
            "referral_amount, " +
            "type " +
            "FROM applicant " +
            "INNER JOIN details " +
            "ON details.applicant_id = applicant.applicant_id " +
            "INNER JOIN status " +
            "ON status.status_id = details.status;"
        )
        console.log("got data...")
        res.status(200).json(getLeads.rows);
    } catch (err) {
        console.log(err.message)
        res.status(500).json("Couldn't get data. Something went wrong.")
    }
})

//--- post applicant---
app.post("/new-lead", async (req, res) => {
    try {
        const { name, email, phone, language, workplace, attempts, location } = req.body;
        const applicant_id = uuidv4();
        const timestamp = new Date().toLocaleString();
        const details_id = Math.floor(Math.random()*100000);
        const referral_amount = 0;
        const comment = null;
        const status = 0;

        const postLead = await pool.query(
            "INSERT INTO applicant (applicant_id, name, email, phone, language, workplace, attempts, location, timestamp) " +
            "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [applicant_id, name, email, phone, language, workplace, attempts, location, timestamp]
        )

        const postDetails = await pool.query(
            "INSERT INTO details (applicant_id, details_id, comment, referral_amount, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [applicant_id, details_id, comment, referral_amount, status]
        )
        res.status(201).json({postleads:postLead.rows, postDetails:postDetails.rows});
    } catch (err) {
        console.log(err.message)
        res.status(500).json("Couldn't add the new lead. Please try again.")
    }
})

//--- update details ---
app.patch("/update-details/:id", async (req, res) => {
    const { id } = req.params;
    const { comment, referral_amount, status } = req.body;

    try{
        const updateDetails = await pool.query(
            "UPDATE details SET comment = $1, referral_amount = $2, status = $3 WHERE details_id = $4 RETURNING *",
            [comment, referral_amount, status, id]
        )
        res.status(201).json(updateDetails.rows);
    } catch (err){
        console.log(err.message)
        res.status(500).json("Couldn't update comment. Who knows what happened :shrug:");
    }
})

// --- delete entry ---
app.delete("/delete-lead/:id", async (req, res) => {
    const { id } = req.params;
        try{
            const deleteLead = await pool.query(
                "DELETE FROM applicant WHERE applicant_id = $1 RETURNING *",
                [id]
            )
            //validate if row with that id exists
            if(deleteLead.rows.length > 0) {
                console.log("id did exist")
                res.status(200).json("success")
            } else {
                console.log("id did not exist")
                res.status(404).json("nothing found with that ID")
            }
        } catch(err) {
            console.log(err);
            res.status(500).json("Couldn't delete, something went wrong");
        }
})

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