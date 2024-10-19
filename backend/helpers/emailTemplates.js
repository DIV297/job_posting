


// Set up the nodemailer transport
const generateEmailBody = (candidate, jobTitle, jobDescription, experienceLevel, endDate, templateType) => {
    if (templateType === "BASIC") {
        return `
    <div style="font-family: Arial, sans-serif;">
        <p>Dear Candidate,</p>

        <p>We have an exciting job opportunity for you!</p>

        <p><strong>Job Title:</strong> ${jobTitle}</p>
        
        <p><strong>Experience Level:</strong> ${experienceLevel}</p>
        
        <p><strong>Description:</strong> ${jobDescription}</p>
        
        <p><strong>End Date:</strong> ${endDate}</p>

        <p>Best Regards,<br>Your Company</p>
    </div>
`;
    } else if (templateType === "INTERMEDIATE") {
        return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd;">
            <div style="text-align: center; padding: 20px 0;">
                <h1 style="color: #333;">Job Opportunity: ${jobTitle}</h1>
            </div>
            <div style="padding: 20px; background-color: white; border-radius: 10px;">
                <p>Dear ${candidate},</p>
                <p>We are excited to inform you about a new job opportunity at our company.</p>
                <h3 style="color: #1a73e8;">Job Details</h3>
                <ul style="line-height: 1.8;">
                    <li><strong>Job Title:</strong> ${jobTitle}</li>
                    <li><strong>Experience Level:</strong> ${experienceLevel}</li>
                    <li><strong>Job Description:</strong> ${jobDescription}</li>
                    <li><strong>End Date:</strong> ${endDate}</li>
                </ul>
                <p>If you're interested, please apply before the end date.</p>
                <p>We look forward to hearing from you soon.</p>
                <p>Best regards,<br>Your Company</p>
            </div>
            <div style="text-align: center; padding: 20px; color: #777; font-size: 12px;">
                © ${new Date().getFullYear()} Your Company. All rights reserved.
            </div>
        </div>
    `;
    } else {
        return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #4CAF50; padding: 20px; color: white; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">Exciting Job Opportunity!</h1>
                <p style="font-size: 16px; margin: 5px 0;">Join our team as a ${jobTitle}</p>
            </div>
            <div style="padding: 20px; background-color: #f9f9f9;">
                <p>Dear ${candidate},</p>
                <p>We are thrilled to inform you about a new opportunity that might interest you!</p>
                
                <h3 style="color: #4CAF50;">Job Details</h3>
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <tr style="background-color: #4CAF50; color: white;">
                        <th style="padding: 10px; text-align: left;">Field</th>
                        <th style="padding: 10px; text-align: left;">Details</th>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Job Title</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${jobTitle}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Experience Level</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${experienceLevel}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Job Description</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${jobDescription}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Application Deadline</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${endDate}</td>
                    </tr>
                </table>
                
                <p style="font-weight: bold;">If you're interested, please apply before the end date!</p>
                <p>We look forward to hearing from you soon.</p>
                <p style="margin-top: 20px; font-style: italic;">Best regards,<br>Your Company</p>
            </div>
            <div style="background-color: #4CAF50; color: white; text-align: center; padding: 10px; font-size: 12px;">
                © ${new Date().getFullYear()} Your Company. All rights reserved.
            </div>
        </div>
    `;
    }
};
module.exports = { generateEmailBody }

