const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
    },
//token to reset password
    resetToken: String,
    resetTokenExpiry: Date,

    accountType:{
        type:String,
        default:"broker",
        required:false,
    },
})

module.exports = mongoose.model("User", userSchema);