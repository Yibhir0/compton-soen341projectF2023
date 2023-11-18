
const Property = require("../models/property.model");

/**
 * It's an async function that uses the property model to find 
 * all properties that are not sold and then returns a status of 200 with the properties
 * in the response body.
 */

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find({ propertyType: { $ne: "Sold" } });
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Creates a new property and saves it to the database.
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
const getFilteredProperties = async (req, res) => {
  // Dynamically build the query.
  let filters = {};

  const data = req.query;
  let and_conds = [];
  const price = {};

  for (const field in data) {

    if (field === "amenities") {
      and_conds.push({ [field]: { $all: data[field] } });
    }
    else if (field === "numberOfBedrooms" || field === "numberOfBathrooms") {
      let p = parseInt(data[field]);
      if (p > 3) {
        and_conds.push({ [field]: { $gte: p } });
      }
      else {
        and_conds.push({ [field]: p });
      }
    }
    else if (field === "minPrice") {
      let p = parseInt(data[field]);
      price["$gte"] = p;

    }
    else if (field === "maxPrice") {
      let p = parseInt(data[field]);
      price["$lte"] = p;
    }
    else {
      let val = new RegExp(data[field]);
      and_conds.push({ [field]: { $regex: val, $options: "i" } });
    }

  }
  if (Object.keys(price).length > 0) and_conds.push({ price: price });
  filters["$and"] = and_conds;


  let query;
  // check if user put  filter values
  if (filters['$and'].length > 0) {
    // Build the query with where clause
    query = Property.where(filters);
  }
  else {
    // No query, fetch all properties
    query = Property;
  }

  // Fetch from mongo
  try {
    const properties = await query.find();

    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
//  Fetches a single property listing by its id (per request param).

const getProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ messahe: "Property not found with id " + id })
    }
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Updates a property listing if it exists and returns
 * the updated property listing.
 */
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByIdAndUpdate(id, req.body);
    if (!property) {
      return res.status(404).json({ message: "Cannot find any property with id " + id + " to update." });
    }
    const updatedProperty = await Property.findById(id);
    res.status(200).json(updatedProperty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/**
 * Deletes a property listing from the database
 * if it exists and returns the updated
 * property listing that was removed.
 */
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByIdAndDelete(id);
    if (!property) {
      return res.status(404).json({ message: "Cannot find any property with id " + id + " to delete." })
    }
    res.status(200).json(property);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/**
 * Fetches by brokerID and returns all properties belonging to
 * a specific broker.
 */
const getBrokerProperties = async (req, res) => {
  try {
    const { id } = req.params;
    const properties = await Property.find({ brokerID: id });
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


/**
 * Method gets documents with a geospatial field within a polygon
 * @param {Array of coordinates} coordinates
 * @returns array of documents
 */
const getPropertiesWithinPolygon = async (req, res) => {


  try {

    // Get the query string object
    const polyObj = req.query;

    // Validate if the query string contains valid keys and values
    const validPolyPoints = validatePolygonPoints(polyObj);

    // Complete the other points of the polygon
    const coordinates = completePolygonPoints(validPolyPoints);

    // Get the document from database
    let documents = await Property.find({
      geometry: {
        $geoWithin:
        {
          $geometry: {

            type: "Polygon",

            coordinates: [[
              [coordinates["neLon"], coordinates["neLat"]],
              [coordinates["nwLon"], coordinates["nwLat"]],
              [coordinates["swLon"], coordinates["swLat"]],
              [coordinates["seLon"], coordinates["seLat"]],
              [coordinates["neLon"], coordinates["neLat"]],
            ]]
          }
        }
      }
    });

    res.status(200).json(documents);

  }

  catch (err) {
    res.status(404).send({ "Error": err.message });
  }

};


/**
 * Adds more points to make a
 * polygon.
 * @param {*} polyObj 
 * @returns 
 */
function completePolygonPoints(polyObj) {
  polyObj.nwLat = polyObj.neLat;
  polyObj.nwLon = polyObj.swLon;
  polyObj.seLat = polyObj.swLat;
  polyObj.seLon = polyObj.neLon;

  return polyObj;

}

/**
 * This method parses and validates points
 * @param {String} num 
 * @returns float or undefined
 */
function validateNumeric(num) {
  let result = parseFloat(num);
  return isNaN(result) ? undefined : result;

}

/**
 * This method checks if the polygon object
 * contains all the coordinates. It uses a
 * helper method validateNumeric to convert from
 * string to float.
 * @param {Object} polyObj 
 * @returns Object with numeric coordinates
 */
function validatePolygonPoints(polyObj) {
  let coordinates = {}
  if (polyObj.neLat !== undefined &&
    polyObj.neLon !== undefined &&
    polyObj.swLat !== undefined &&
    polyObj.swLon !== undefined) {

    Object.keys(polyObj).forEach(k => {
      let result = validateNumeric(polyObj[k.toString()]);

      if (result) {
        coordinates[k.toString()] = result
      }

    });
  }

  return Object.keys(coordinates).length === 4 ? coordinates : undefined;
}

module.exports = {
  getProperties,
  addProperty,
  getFilteredProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  getBrokerProperties,
  getPropertiesWithinPolygon,
};