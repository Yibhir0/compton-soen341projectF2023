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
    accountVerified:{
        type: Boolean,
        default: false,
        required:false,
    },
})

module.exports = mongoose.model("User", userSchema);