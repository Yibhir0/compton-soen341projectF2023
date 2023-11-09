const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');




const secretKey = process.env.SECRET_KEY;

const updateBroker = async(req, res) =>{
    
}

const updateClient = async(req, res) =>{
   
}

const updateAdmin = async(req, res) =>{
    
}

module.exports = {
    updateBroker, 
    updateClient, 
    updateAdmin,
};