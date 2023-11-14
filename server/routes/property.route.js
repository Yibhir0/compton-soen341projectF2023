const express = require("express");
// This is the router for proerties
const {
  getProperties,
  addProperty,
  getFilteredProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  getBrokerProperties,
  getPropertiesWithinGeoPolygon,
} = require("../controllers/property.controller");

const router = express.Router();

/* Creating a route for the get request. */
router.get("/properties", getProperties);
/* Creating a route for the post request. */
router.post("/property", addProperty);
// Creating route for get properties with filtering
router.get("/properties/filter", getFilteredProperties);
/* Creating a route for the get request. */
router.get("/properties/:id", getProperty);
/* Creating a route for the put request. */
router.put("/properties/:id", updateProperty);
/* Creating a route for the delete request. */
router.delete("/properties/:id", deleteProperty);

router.get("/brokerproperties/:id", getBrokerProperties);

router.get("/properties/polygon", getPropertiesWithinGeoPolygon);

module.exports = router;