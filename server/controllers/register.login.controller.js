const { JsonWebTokenError } = require("jsonwebtoken");
const Broker = require("../models/broker.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secretkey'

const register = async(req, res) =>{
    try{
        const {email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const newBroker = new Broker({email, password:hashedPassword});
        console.log(newBroker);
        await newBroker.save();
        res.status(201).json({message: "User created successfully"});
    }catch(error){
        res.status(500).json({error: "Error signing up"})
    }
}

const login = async(req, res) =>{
    try{
        const{email, password} = req.body;
        const broker = await Broker.findOne({email});
        if(!broker){
            return res.status(401).json({error: "Invalid email"})
        }

        const isPasswordValid = await bcrypt.compare(password, broker.password);
        if(!isPasswordValid){
            return res.status(401).json({error: "Invalid password."})
        }
        const token = jwt.sign({brokerId: broker._id}, SECRET_KEY, {expiresIn: '1hr'});
        res.json({message:"Login successful"})
    }catch(error){
        res.status(500).json({error: "Error logging in"})
    }
}

module.exports = {
    register,
    login,
};