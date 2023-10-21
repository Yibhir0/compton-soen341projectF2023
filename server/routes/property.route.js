const express = require("express");

const {
  getProperties,
  addProperty,
  getProperty,
  updateProperty,
} = require("../controllers/property.controller");

const router = express.Router();

/* Creating a route for the get request. */
router.get("/properties", getProperties);
/* Creating a route for the post request. */
router.post("/property", addProperty);
/* Creating a route for the get request. */
router.get("/properties/:id", getProperty);
/* Creating a route for the put request. */
router.put("/properties/:id", updateProperty);

module.exports = router;