
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
  // Dynamically build the query.
  let filters = {};
  
  const data = req.query;
  let and_conds = [];
  const price={};
  
  for (const field in data) {
  
    if(field === "amenities"){
      and_conds.push({ [field]:{$all : data[field]} });
    }
    else if(field === "numberOfBedrooms" || field ==="numberOfBathrooms"){
      let p = parseInt(data[field]);
      if(p>3){
        and_conds.push({[field]: { $gte: p }});
      }
      else{
        and_conds.push({[field]: p });
      }
    }
    else if( field=== "minPrice"){
      let p = parseInt(data[field]);
      price["$gte"] = p;

    }
    else if( field=== "maxPrice"){
      let p = parseInt(data[field]);
      price["$lte"] = p;
    }
    else{
      let val = new RegExp(data[field]);
      and_conds.push({[field]: { $regex: val, $options: "i" }});
    }
    
  }
  if(Object.keys(price).length>0) and_conds.push({price:price});
  filters["$and"] = and_conds;

  
  let query;
  // check if user put  filter values
  if(filters['$and'].length>0){
    // Build the query with where clause
    query = Property.where(filters); 
  }
  else{
    // No query, fetch all properties
    query = Property;
  }

  // Fetch from mongo
    try{
    const properties = await query.find();
    res.status(200).json(properties);
    } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
 getProperties,
 addProperty,
 getFilteredProperties
};