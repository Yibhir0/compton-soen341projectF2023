

const Visit = require("../models/visit.model");


// Get all visits
const getVisits = async (req, res) => {
  try {
    const { brokerId } = req.query;
    const visits = await Visit.find({ brokerID: brokerId })

    res.status(200).json(visits);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Adds a visit
const addVisit = async (req, res) => {
  const visit = new Visit(req.body);

  try {
    const newVisit = await visit.save();
    res.status(201).json(newVisit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Updates visits
const updateVisit = async (req, res) => {


  const { id } = req.params;


  try {

    const visit = await Visit.findByIdAndUpdate(id, req.body);;

    if (!visit) {
      return res.status(404).json({ message: 'Visit not found' });
    }

    // Save the updated user
    //const updatedVisit = await visit.save();

    res.status(200).json(visit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

//Deletes a requested visist
const deleteVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const visit = await Visit.findByIdAndDelete(id);
    if (!visit) {
      return res.status(404).json({ message: "Cannot find any visit with id " + id + " to delete." })
    }
    res.status(200).json(visit);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
}



module.exports = { getVisits, addVisit, updateVisit, deleteVisit };