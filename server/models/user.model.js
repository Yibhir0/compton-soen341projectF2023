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
    accountVerified:{//Whether an is verified or not by an admin.A verified homebuyer account can become a broker account
        type: Boolean,
        default: false,
        required:false,
    },
    firstName:{//First name of the user
        type:String,
        required: false,
        default:""
    },
    lastName:{//Last name of the user
        type:String,
        required: false,
        default:""
    },
    phoneNumber:{//The user's phone number
        type:String,
        required: false,
        default:""
    },
    licenseNumber:{//The broker license number. This number is exclusive to brokers and is unique to each user
        type:String,
        required: false,
        default:""
    },
    agency:{// The broker agencyof the user
        type:String,
        required: false,
        default:""
    },
})

module.exports = mongoose.model("User", userSchema);
