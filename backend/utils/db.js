const mongoose=require('mongoose');
require('dotenv').config();

const db = ()=>{
    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log("db connected")
    }).catch((err)=>{
        console.log(err.message)
    })
}
module.exports = {db}     