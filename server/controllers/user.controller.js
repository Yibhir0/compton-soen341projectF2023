

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
      res.status(200).json(user);
    } catch(err){
      res.status(500).json({ message: err.message });
    }
  };


  
/**
 * Deletes a user
 */
const deleteUser= async (req, res) =>{
  try{
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id);
    if(!user){
      return res.status(404).json({message: "Cannot find any user with id " + id + " to delete."})
    }
    res.status(200).json(user);
  }
  catch(err){
    res.status(500).json({ message: err.message });
  }
}

module.exports = {getUsers,getUser,deleteUser};