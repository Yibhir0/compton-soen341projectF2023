const express = require("express");
const{
   getUsers,
   getUser,
   deleteUser,
   getNonVerifiedUsers,
   verifyUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/users/nonverified", getNonVerifiedUsers);
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.delete("/users/:id",  deleteUser);
router.put("/users/:id", verifyUser);

module.exports = router;