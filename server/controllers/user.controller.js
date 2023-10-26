

const User = require("../models/user.model");


// Get all brokers
const getUsers = async(req, res) =>{
    try {
        const users = await User.find({accountType:"broker"});
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};

// Get broker
const getUser = async(req, res) => {
    try{
      const id = req.params.id;
     
      const user = await User.findById(id);
      console.log(user);
      res.status(200).json(user);
    } catch(err){
      console.log("hell");
      res.status(500).json({ message: err.message });
    }
  };

module.exports = {getUsers,getUser};