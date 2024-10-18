

const nodemailer = require('nodemailer'); // For sending email
const twilio = require('twilio'); // For sending SMS
const Company = require('../models/Company');
require("dotenv").config();
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "AC2fed079084852e88574cb6c9e16568cf"
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "999fc225f49d389ff991cec3c5c2c133"
const jwt = require('jsonwebtoken');
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || "+18646190561"
const EMAIL_NODEMAILER = process.env.EMAIL_NODEMAILER || "yizr ctue koep jceh"
const EMAIL = process.env.EMAIL || "divbajaj297@gmail.com"
// Twilio configuration (replace with your own credentials)
const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


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
        const otpAgain = generateOTP();
        if (existingCompany) {
            return res.status(409).json({ message: 'Company already registered' });
        }

        // Create new company instance
        const newCompany = new Company({ name, phoneNumber, companyName, companyEmail, empSize, numberOTP: otpAgain, emailOTP: otp });
        await newCompany.save();

        // Generate OTP

        // Send OTP via email
        // const transporter = nodemailer.createTransport({
        //     service: 'Gmail', // Adjust according to your email provider
        //     auth: {
        //         user: EMAIL, // Replace with your email
        //         pass: EMAIL_NODEMAILER, // Replace with your email password
        //     },
        // });

        // const mailOptions = {
        //     from: EMAIL,
        //     to: companyEmail,
        //     subject: 'Your OTP for Registration',
        //     text: `Your OTP for registration is: ${otp}`,
        // };

        // transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         return console.log('Error sending email: ', error);
        //     }
        //     console.log('Email sent: ', info.response);
        // });

        // // Send OTP via SMS
        // twilioClient.messages.create({
        //     body: `Your OTP for registration is: ${otpAgain}`,
        //     from: TWILIO_PHONE_NUMBER, // Replace with your Twilio number
        //     to: phoneNumber,
        // })
        // .then(message => console.log('SMS sent: ', message.sid))
        // .catch(error => console.log('Error sending SMS: ', error));

        return res.status(201).json({ success: 1, message: 'Company registered successfully. OTP sent for verification.', details: newCompany._id });
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

// POST /api/verify-mobile
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
        const { id } = req.body;
        
        // Find the company by its ID
        let user = await Company.findById(id);
        
        if (user.isEmailVerified && user.isMobileVerified) {
            // Generate JWT token
            const token = jwt.sign(
                { user }, // Payload data
                process.env.JWT_SECRET || "secret", // Secret key from environment variables
                { expiresIn: '1h' } // Token expiration time
            );

            return res.status(200).json({
                success: true,
                message: 'Both Email and Mobile OTP verified',
                token, // Return JWT token in response
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Please verify both email and mobile OTP',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

module.exports = { registerCompany, verifyEmailOTP, verifyMobileOTP,verifyBoth }
