const express = require("express");
const{
   getUsers,
   getUser,
   deleteUser
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.delete("/users/:id",  deleteUser);

module.exports = router;