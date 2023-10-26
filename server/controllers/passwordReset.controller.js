const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY; 

const passwordReset = async(req, res) =>{
    try{
        const{email, password} = req.body;
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({error: "Invalid email"})
        }
    }catch(error){
        res.status(500).json({error: "Error"})
    }
}

module.exports = {
  passwordReset,
};