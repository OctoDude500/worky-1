const express = require("express");
const {
    getLeads,
    createLead,
    updateLeadDetails,
    deleteEntry
} = require("../controllers/leadControllers");

const router = express.Router();

// --- get all transactions ---
router.get("/", getLeads);

//--- post applicant---
router.post("/new-lead", createLead);

//--- update details ---
router.patch("/update-details/:id", updateLeadDetails);

// --- delete entry ---
router.delete("/delete-lead/:id", deleteEntry);

module.exports = router