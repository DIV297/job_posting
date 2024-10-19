const Jobs = require("../models/Jobs");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Company = require("../models/Company");
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const { sendEmailToCandidates } = require("../helpers/nodemailer");



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
const login = async (req, res) => {
    const { loginIdentifier, password } = req.body;

    try {
        // Find user by email or phone
        let user = await Company.findOne({
            $or: [{ companyEmail: loginIdentifier }, { phoneNumber: loginIdentifier }],
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { user },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respond with token
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const addJob = async (req, res) => {
    try {
        const { jobTitle, jobDescription, experienceLevel, candidates, endDate,templateType } = req.body;

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

        // Email the candidates after the job is saved
        await sendEmailToCandidates(candidates, jobTitle, jobDescription, experienceLevel, endDate,templateType);

        return res.status(201).json({ success: true, message: 'Job added successfully', data: newJob });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getJobsByCompanyId = async (req, res) => {
    try {
        const companyId = req.user._id; // Extract the company ID from the JWT token
        const { page = 1, limit = 10 } = req.query; // Get page and limit from query params, default to page 1 and limit 10

        // Fetch jobs for the company, sorted by createdAt in descending order, with pagination
        const jobs = await Jobs.find({ companyId })
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        // Get total count of jobs for pagination purposes
        const totalJobs = await Jobs.countDocuments({ companyId });

        return res.status(200).json({
            success: true,
            data: jobs,
            totalPages: Math.ceil(totalJobs / limit),
            currentPage: page,
            totalJobs,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
module.exports = { authorizeCompany, addJob, login,getJobsByCompanyId }