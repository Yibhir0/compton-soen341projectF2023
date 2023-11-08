const express = require("express");
const{
   getUsers,
   getBrokers,
   getUser,
   deleteUser,
   getNonVerifiedUsers,
   verifyUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/brokers", getBrokers);
router.get("/users/nonverified", getNonVerifiedUsers);
router.get("/users/:id", getUser);
router.get("/users", getUsers);
router.delete("/users/:id",  deleteUser);
router.put("/users/:id", verifyUser);

module.exports = router;