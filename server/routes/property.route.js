const express = require("express");

const {
  getProperties,
  addProperty,
<<<<<<< HEAD
  getFilteredProperties
=======
  getProperty,
  updateProperty,
  deleteProperty,
>>>>>>> 0ea0115f348cd2681d5c3833a9353417011ce2f2
} = require("../controllers/property.controller");

const router = express.Router();

/* Creating a route for the get request. */
router.get("/properties", getProperties);
/* Creating a route for the post request. */
router.post("/property", addProperty);
<<<<<<< HEAD
// Creating route for get properties with filtering
router.get("/properties/:filter",  getFilteredProperties);
=======
/* Creating a route for the get request. */
router.get("/properties/:id", getProperty);
/* Creating a route for the put request. */
router.put("/properties/:id", updateProperty);
/* Creating a route for the delete request. */
router.delete("/properties/:id", deleteProperty);
>>>>>>> 0ea0115f348cd2681d5c3833a9353417011ce2f2

module.exports = router;