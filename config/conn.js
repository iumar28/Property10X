const mongoose = require("mongoose")


const connectDB = ()=>{
    mongoose.set("strictQuery", false);
    mongoose.connect("mongodb://127.0.0.1/job").then(()=>{
        console.log("mongodb connected")
    })
 }
    
module.exports=connectDB