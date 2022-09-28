const express = require("express");
const {
    getLeads,
    createLead,
    updateLeadDetails,
    deleteEntry,
    getDetails,
    getStatus
} = require("../controllers/leadControllers");
const requireAuth = require("../middleware/requireAuth")

const router = express.Router();

//--- post applicant---
router.post("/new-lead", createLead);

//this will find the requireauth middleware and will instantiate it
//before anything else below it
router.use(requireAuth)

// --- get all transactions ---
router.get("/", getLeads);

// ---- get status list ---
router.get("/status", getStatus)


//--- get details ---
router.get("/get-details/:id", getDetails);

//--- update details ---
router.patch("/update-details/:id", updateLeadDetails);

// --- delete entry ---
router.delete("/delete-lead/:id", deleteEntry);

module.exports = router