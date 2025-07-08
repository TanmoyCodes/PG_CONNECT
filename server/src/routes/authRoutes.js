const express = require('express');
const router = express.Router();


const authController = require('../controllers/auth-controller');

// api/v1/auth/register
router.post('/register', authController.registerUser);

module.exports = router;