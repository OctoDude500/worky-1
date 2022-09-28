//const leadDB = require("../models/leads.sql");
const pool = require("../models/db");
const {v4: uuidv4} = require("uuid");
//const isAlpha = require("validator/es/lib/isAlpha");
const validator = require("validator");
//const {ignore} = require("nodemon/lib/rules");

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
    } catch (err) {
        console.log(err.message)
        res.status(500).json({msg: "Couldn't get data. Something went wrong."})
    }
}

// ---- get details ---
const getDetails = async (req, res) => {
    try {
        const {id} = req.params;
        const request = await pool.query(
            "SELECT * FROM details WHERE details_id = $1",
            [id]
        )
        console.log("is request", id)
        res.status(200).json(request.rows);
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Something went wrong"})
    }
}

//--- get status ---
const getStatus = async (req, res) => {
    try {
        const request = await pool.query(
            "SELECT * FROM status",
        )
        res.status(200).json(request.rows)
    } catch (error) {
        console.log("is error in getstatus", error)
    }
}

// post values validation --*
let newValues = {}
const validate = async (name, email, phone) => {

    const new_name = name.toLowerCase().trim()
    //it won't count the blank spaces between characters
    if (!validator.isAlpha(new_name, ["es-ES"], {ignore: ' '}) || new_name.length <= 10) {
        throw Error("Please enter a valid name")
    } else {
        newValues = {...newValues, new_name}
    }

    const new_email = email.toLowerCase().trim();
    if(!validator.isEmail(new_email)) {
        throw Error("Please enter a valid email")
    } else {
        newValues = {...newValues, new_email}
    }

    const new_phone = phone.trim()
    if(!validator.isMobilePhone(new_phone) || new_phone.length < 8 || new_phone.length > 8) {
        throw Error("Please enter a valid phone number")
    } else {
        newValues = {...newValues, new_phone}
    }

}

//--- post applicant---
const createLead = async (req, res) => {
    console.log("this is from php ", req.body)
    try {
        const {name, email, phone, language, workplace, attempts, location} = req.body;
        const applicant_id = uuidv4();
        const timestamp = new Date()
        const details_id = Math.floor(Math.random() * 100000);
        const referral_amount = 0;
        const comment = null;
        const status = 0;

        await validate(name, email, phone);
        const { new_name, new_email, new_phone } = newValues

        console.log("is new values", newValues)

        const postLead = await pool.query(
            "INSERT INTO applicant (applicant_id, name, email, phone, language, workplace, attempts, location, timestamp) " +
            "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [applicant_id, new_name, new_email, new_phone, language, workplace, attempts, location, timestamp]
        )

        const postDetails = await pool.query(
            "INSERT INTO details (applicant_id, details_id, comment, referral_amount, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [applicant_id, details_id, comment, referral_amount, status]
        )
        console.log("is post", postLead.rows)
        res.status(201).json({postleads:postLead.rows, postDetails:postDetails.rows});
    } catch (err) {
        console.log(err.message)
        res.status(400).json({msg: err.message})
    }
}

//--- update details ---
const updateLeadDetails = async (req, res) => {
    const { id } = req.params;
    //const { comment, referral_amount, status } = req.body;
    const { is_comment, amount, is_type } = req.body;
    try{
        const updateDetails = await pool.query(
            "UPDATE details SET comment = $1, referral_amount = $2, status = $3 WHERE details_id = $4 RETURNING *",
            [is_comment, amount, is_type, id]
        )
        res.status(201).json(updateDetails.rows);
    } catch (err){
        console.log(err.message)
        //res.status(500).json({msg: "Couldn't update comment. Who knows what happened :shrug:"});
        res.status(500).json({msg: err});
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
        res.status(500).json({msg: "Couldn't delete, something went wrong"});
    }
}

module.exports = {
    getLeads,
    createLead,
    updateLeadDetails,
    deleteEntry,
    getDetails,
    getStatus
}