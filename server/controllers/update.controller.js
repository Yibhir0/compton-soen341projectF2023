const User = require("../models/user.model");


const updateAccountInfo = async(req, res) =>{
  try {
    const  email  = req.body.email;
    const update = await User.findOneAndUpdate({ email: email }, req.body);

    if(!update){
      return res.status(404).json({ message: "Cannot find any user with email " + email + " to update." });
    }
    res.status(200).json(email);

  } catch (error) {
    console.log("error")
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  updateAccountInfo,
};