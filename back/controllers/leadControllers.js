//const leadDB = require("../models/database.sql");
const pool = require("../models/db");
const {v4: uuidv4} = require("uuid");

// --- get all transactions ---
const getLeads = async (req, res) => {
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
        //res.status(200).send('<h2>posted</h2>');
        // res.status(200).json("success");
    } catch (err) {
        console.log(err.message)
        res.status(500).json("Couldn't get data. Something went wrong.")
    }
}

//--- post applicant---
const createLead = async (req, res) => {
    try {
        const {name, email, phone, language, workplace, attempts, location} = req.body;
        const applicant_id = uuidv4();
        const timestamp = new Date()
        const details_id = Math.floor(Math.random() * 100000);
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
}

//--- update details ---
const updateLeadDetails = async (req, res) => {
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
}

// --- delete entry ---
const deleteEntry = async (req, res) => {
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
}

module.exports = {
    getLeads,
    createLead,
    updateLeadDetails,
    deleteEntry
}