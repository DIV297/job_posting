
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
},
    {
        timestamps: true
    }
)
module.exports = mongoose.model('company', Company)