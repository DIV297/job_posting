
const mongoose = require('mongoose')
const Company = mongoose.Schema({
    name: { 
        type: String,
        default:"",
     },
    phoneNumber: {
        type: String,
        default:"",
        unique:true
    },
    companyName: {
        type: String,
        default:""
    },
    companyEmail: {
        type: String,
        default:"",
        unique: true
    },
    empSize: {
        type: Number,
        default:0
    },
    numberOTP: {
        type: String,  // Store OTP as string for phone verification
        default: ""
    },
    emailOTP: {
        type: String,  // Store OTP as string for email verification
        default: ""
    },
    isMobileVerified: {
        type: Boolean,  // Store OTP as string for email verification
        default: false
    },
    isEmailVerified: {
        type: Boolean,  // Store OTP as string for email verification
        default: false
    }
},
    {
        timestamps: true
    }
)
module.exports = mongoose.model('company', Company)