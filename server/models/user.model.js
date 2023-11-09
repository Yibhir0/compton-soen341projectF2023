const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {//The email associate with the user
        type: String,
        required: true,
        unique: true,
    },
    password: {// The password required to login to the account
        type: String,
        required: true,
    },
    accountType: {// The privelages given to the user (homebuyer, broker or admin).By default a user is set to homebuyer
        type: String,
        default: "homebuyer",
        required: true,
    },
    accountVerified:{//
        type: Boolean,
        default: false,
        required:false,
    },
    firstName:{
        type:String,
        required: false,
        default:""
    },
    lastName:{
        type:String,
        required: false,
        default:""
    },
    phoneNumber:{
        type:String,
        required: false,
        default:""
    },
    licenseNumber:{
        type:String,
        required: false,
        default:""
    },
    agency:{
        type:String,
        required: false,
        default:""
    },
})

module.exports = mongoose.model("User", userSchema);
