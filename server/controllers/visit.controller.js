

const Visit = require("../models/visit.model");


// Get all visits
const getVisits = async(req, res) =>{
    try{
        const {brokerId} = req.query;
        const visits = await Visit.find({brokerId: brokerId})
    
        res.status(200).json(visits);
      }
      catch(err){
        res.status(500).json({ message: err.message });
      }
};

const addVisit = async (req, res) => {
    const visit = new Visit(req.body);
  
    try {
      const newVisit = await visit.save();
      res.status(201).json(newVisit);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  


module.exports = {getVisits,addVisit};