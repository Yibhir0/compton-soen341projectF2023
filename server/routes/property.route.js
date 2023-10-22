const express = require("express");

const {
  getProperties,
  addProperty,
  getFilteredProperties
} = require("../controllers/property.controller");

const router = express.Router();

/* Creating a route for the get request. */
router.get("/properties", getProperties);
/* Creating a route for the post request. */
router.post("/property", addProperty);
// Creating route for get properties with filtering
router.get("/properties/:filter",  getFilteredProperties);

module.exports = router;