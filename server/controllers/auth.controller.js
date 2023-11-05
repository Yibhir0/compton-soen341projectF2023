const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

const register = async(req, res) =>{
    try{
        
        const {email, password,accountType} = req.body;
        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({email, password:hashedPassword,accountType});
        await newUser.save();
        res.status(201).json({message: "User created successfully"});
    }catch(error){
        res.status(500).json({error: "Email already exists."})
    }
}

const login = async(req, res) =>{
    try{
        const{email, password} = req.body;
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({error: "Invalid email"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({error: "Invalid password."})
        }
       
        if(user.accountVerified == false){
            return res.status(401).json({error: "Verification is currently pending."})
        }
        const token = jwt.sign({brokerId: user._id}, secretKey, {expiresIn: '1hr'});

    
        res.json({message:"Login successful", token: token,id:user._id})
    }catch(error){
        res.status(500).json({error: "Error logging in"})
    }
}

module.exports = {
    register,
    login,
};