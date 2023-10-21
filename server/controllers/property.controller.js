
const Property = require("../models/property.model");

/**
 * It's an async function that uses the property model to find 
 * all properties and then returns a status of 200 with the properties
 * in the response body.
 */

const getProperties = async (req, res) => { 
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * It creates a new property and saves it to the database.
 */
const addProperty = async (req, res) => {
  const property = new Property(req.body);

  try {
    const newProperty = await property.save();
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Fetches a single property listing by its id (per request param).
 */
const getProperty = async(req, res) => {
  try{
    const {id} = req.params;
    const property = await Property.findById(id);
    if(!property){
      return res.status(404).json({messahe: "Property not found with id " + id})
    }
    res.status(200).json(property);
  } catch(err){
    res.status(500).json({ message: err.message });
  }
};

/**
 * Updates a property listing if it exists and returns
 * the updates property listing.
 */
const updateProperty = async (req, res) =>{
  try {
    const{id} = req.params;
    const property = await Property.findByIdAndUpdate(id, req.body);
    if(!property){
      return res.status(404).json({message: "Cannot find any property with id " + id + " to update."});
    }
    const updatedProperty = await Property.findById(id);
    res.status(200).json(updatedProperty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// to Do (delete,edit..etc)

module.exports = {
  getProperties,
  addProperty,
  getProperty,
  updateProperty,
 };