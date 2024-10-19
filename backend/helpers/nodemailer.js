const nodemailer = require('nodemailer');
const { generateEmailBody } = require('./emailTemplates');
const EMAIL_NODEMAILER = process.env.EMAIL_NODEMAILER || "yizr ctue koep jceh"
const EMAIL = process.env.EMAIL || "divbajaj297@gmail.com"

const sendEmailToCandidates = async (candidates, jobTitle, jobDescription, experienceLevel, endDate, templateType) => {
    // Set up the nodemailer transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: EMAIL_NODEMAILER,
        },
    });


    // Loop through each candidate and send the email
    for (const candidate of candidates) {
        const mailOptions = {
            from: EMAIL,
            to: candidate,
            subject: `New Job Opportunity: ${jobTitle}`,
            html: generateEmailBody(candidate, jobTitle, jobDescription, experienceLevel, endDate, templateType),
        };

        // Send the email
        await transporter.sendMail(mailOptions);
    }
};

const sendEmailVerification = async (companyEmail, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Adjust according to your email provider
        auth: {
            user: EMAIL, // Replace with your email
            pass: EMAIL_NODEMAILER, // Replace with your email password
        },
    });

    const mailOptions = {
        from: EMAIL,
        to: companyEmail,
        subject: 'Your OTP for Registration',
        text: `Your OTP for registration is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error sending email: ', error);
        }
        console.log('Email sent: ', info.response);
    });
}
module.exports = { sendEmailToCandidates, sendEmailVerification }