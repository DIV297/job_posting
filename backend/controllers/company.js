const Jobs = require("../models/Jobs");

const authorizeCompany = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "authorized success",
            data: req.user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
}
const addJob = async (req, res) => {
    try {
        const { jobTitle, jobDescription, experienceLevel, candidates, endDate } = req.body;

        // Create a new job instance with companyId from req.user._id
        const newJob = new Jobs({
            jobTitle,
            jobDescription,
            experienceLevel,
            candidates,
            endDate,
            companyId: req.user._id, // Set companyId from the authenticated user's ID
        });

        // Save the job to the database
        await newJob.save();
        return res.status(201).json({ success: true, message: 'Job added successfully', data: newJob });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
module.exports = { authorizeCompany, addJob }