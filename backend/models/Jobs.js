
const mongoose = require('mongoose')
const Jobs  = mongoose.Schema({
    jobTitle: { 
        type: String,
        default:"",
     },
    jobDescription: {
        type: String,
        default:"",
    },
    experienceLevel: {
        type: String,
        default:""
    },
    candidates: {
        type: [String],
        default:[],
    },
    endDate: {
        type: String,
        default:""
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company', 
        required: true,
    },
},
    {
        timestamps: true
    }
)
module.exports = mongoose.model('job', Jobs)