const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "AC2fed079084852e88574cb6c9e16568cf"
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "999fc225f49d389ff991cec3c5c2c133"
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || "+18646190561"
const twilio = require('twilio'); // For sending SMS

const sendNumberVerification = async(phoneNumber,otp)=>{
    const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

        twilioClient.messages.create({
            body: `Your OTP for registration is: ${otp}`,
            from: TWILIO_PHONE_NUMBER, // Replace with your Twilio number
            to: phoneNumber,
        })
        .then(message => console.log('SMS sent: ', message.sid))
        .catch(error => console.log('Error sending SMS: ', error));
}

module.exports = {sendNumberVerification}