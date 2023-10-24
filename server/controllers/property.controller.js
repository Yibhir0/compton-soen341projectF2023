
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
 * find properties with filter criteria
 */
const getFilteredProperties = async(req,res) =>{
  console.log(req.query.city);
  // Dynamiccaly set the filter conditions
  const filters = {};
  filters['$and'] = [];

  if(req.query.address) filters['$and'].push({ address: req.query.address});
  if(req.query.city) filters['$and'].push({ city: req.query.city});
  if(req.query.postalCode) filters['$and'].push({ postalCode: req.query.postalCode});
  if(req.query.propertyType) filters['$and'].push({ propertyType: req.query.propertyType});
  const price={};
  
  if(req.query.minPrice){
    price["$gte"] = parseInt(req.query.minPrice);
  } 
  if(req.query.maxPrice){
    price["$lte"] = parseInt(req.query.maxPrice);
  }
  if(Object.keys(price).length>0){
    filters["$and"].push({price:price});
  }
  if(req.query.numberOfBedrooms)filters['$and'].push({ numberOfBedrooms: req.query.numberOfBedrooms});
  if(req.query.numberOfBathrooms) filters['$and'].push({ numberOfBathrooms: req.query.numberOfBathrooms});
  if(req.query.amenities) filters['$and'].push({ amenities:{$all : req.query.amenities} });
  console.log(filters);
  // Build the query with where clause
  const query = Property.where(filters); 

  // Fetch from mongo
    try{
    const properties = await query.find();
    res.status(200).json(properties);
    } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// to Do (delete,edit..etc)

module.exports = {
 getProperties,
 addProperty,
 getFilteredProperties
};