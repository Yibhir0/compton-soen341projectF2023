const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        default: "homebuyer",
        required: true,
    },
    accountVerified: {
        type: Boolean,
        default: false,
        required: false,
    },
    firstName: {
        type: String,
        required: false,
        default: ""
    },
    lastName: {
        type: String,
        required: false,
        default: ""
    },
    phoneNumber: {
        type: String,
        required: false,
        default: ""
    },
    licenseNumber: {
        type: String,
        required: false,
        default: ""
    },
    agency: {
        type: String,
        required: false,
        default: ""
    },
    resetCode:{
        type:String,
        required: false,
        default:""
    },
})

module.exports = mongoose.model("User", userSchema);