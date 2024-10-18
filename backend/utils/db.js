const mongoose=require('mongoose');
require('dotenv').config();

const db = ()=>{
    mongoose.connect(process.env.DATABASE_URL || "mongodb+srv://divbajaj297:pAZSyVJgf6GT7fJX@cluster0.zuqqx.mongodb.net/jobposting").then(()=>{
        console.log("db connected")
    }).catch((err)=>{
        console.log(err.message)
    })
}
module.exports = {db}     