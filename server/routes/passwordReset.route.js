const express = require('express');
const router = express.Router();
const passwordResetController = require('../controllers/passwordReset.controller');

// Route - reset code to user email
router.post('/sendResetCode', passwordResetController.sendResetCode);

// Route  -  reset password
router.post('/resetPassword', passwordResetController.resetPassword);

module.exports = router;
