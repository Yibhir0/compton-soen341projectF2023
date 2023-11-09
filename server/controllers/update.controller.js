const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const updateBroker = async(req, res) =>{
    const { email, password, accountType, firstName, lastName, phoneNumber, licenseNumber, agency} = req.body;
    console.log(req.body);
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email' });
    }
    
    const hashedPassword = await bcrypt.hash(password,10);
    user = ({email, password:hashedPassword,accountType:accountType,firstName:firstName,lastName:lastName,phoneNumber:phoneNumber,licenseNumber:licenseNumber,agency:agency});
    //await user.save();
    console.log(user)
    return res.status(200).json({ message: "Email found, verification code sent soon" });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
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