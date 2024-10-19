

const bcrypt = require('bcrypt'); 
const Company = require('../models/Company');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const { sendEmailVerification } = require('../helpers/nodemailer');
const { sendNumberVerification } = require('../helpers/twillio');


// Function to generate a random OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP

// POST API for registration
const registerCompany = async (req, res) => {
    const { name, phoneNumber, companyName, companyEmail, empSize } = req.body;

    // Validate input
    if (!name || !phoneNumber || !companyName || !companyEmail || !empSize) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the company already exists 
        const existingCompany = await Company.findOne({ $or: [{ phoneNumber }, { companyEmail }] });
        const otp = generateOTP();
        const otpAgain = "000000";
        if (existingCompany && existingCompany.isMobileVerified===true && existingCompany.isEmailVerified===true) {
            return res.status(409).json({ message: 'Company already registered' });
        }
        await sendEmailVerification(companyEmail, otp);
        await sendNumberVerification(phoneNumber, otpAgain);
        if(!existingCompany){
            const newCompany = new Company({ name, phoneNumber, companyName, companyEmail, empSize, numberOTP: otpAgain, emailOTP: otp });
            await newCompany.save();
            return res.status(201).json({ success: 1, message: 'Company registered successfully. OTP sent for verification.', details: newCompany._id });
        }
        else{
            existingCompany.numberOTP = otpAgain;
            existingCompany.emailOTP = otp;
            await existingCompany.save();
            return res.status(201).json({ success: 1, message: 'Company registered successfully OTP sent for verification.', details: existingCompany._id });
        }

    } catch (error) {
        return res.status(500).json({ success: 0, message: 'Internal Server Error', error: error.message });
    }
};

const verifyEmailOTP = async (req, res) => {
    const { emailOTP, id } = req.body;

    try {
        const company = await Company.findOne({ _id: id, emailOTP });

        if (!company) {
            return res.status(400).json({ success: false, message: 'Invalid Email OTP' });
        }

        // Mark the email as verified (optional step, depends on your requirement)
        company.isEmailVerified = true;
        await company.save();

        return res.status(200).json({ success: true, message: 'Email OTP verified' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const verifyMobileOTP = async (req, res) => {
    const { mobileOTP, id } = req.body;

    try {
        const company = await Company.findOne({ _id: id, numberOTP: mobileOTP });

        if (!company) {
            return res.status(400).json({ success: false, message: 'Invalid Mobile OTP' });
        }

        // Mark the mobile as verified (optional step, depends on your requirement)
        company.isMobileVerified = true;
        await company.save();

        return res.status(200).json({ success: true, message: 'Mobile OTP verified' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
const verifyBoth = async (req, res) => {
    try {
        const { id, password } = req.body;

        // Find the company by its ID
        let user = await Company.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Company not found',
            });
        }

        // Check if both email and mobile are verified
        if (user.isEmailVerified && user.isMobileVerified) {

            // Hash the password before saving
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Update the user's password with the hashed one
            user.password = hashedPassword;

            // Save the updated user
            await user.save();

            // Generate JWT token
            const token = jwt.sign(
                { user }, // Payload data (you can limit this to user-specific data)
                process.env.JWT_SECRET || "secret", // Secret key from environment variables
                { expiresIn: '1h' } // Token expiration time
            );

            return res.status(200).json({
                success: true,
                message: 'Both Email and Mobile OTP verified, and password set successfully',
                token, // Return JWT token in response
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Please verify both email and mobile OTP',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

module.exports = { registerCompany, verifyEmailOTP, verifyMobileOTP,verifyBoth }
