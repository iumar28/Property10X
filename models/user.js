const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstname:{
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
    },
    lastname:{
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
    },
    email: {
        type: String,
        uniqe: true,
    },
    phone: {
        type: String,
        required: [true, "please enter the phone number"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
    },
})


module.exports=mongoose.model("reg",userSchema)