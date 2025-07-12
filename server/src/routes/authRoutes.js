const express = require('express');
const router = express.Router();


const authController = require('../controllers/auth-controller');
const authMiddlewares = require('../middlewares/auth-middleware');

// api/v1/auth/register
router.post('/register', authController.registerUser);
// api/v1/auth/login
router.post('/login', authController.loginUser);
// api/v1/auth/checkAdmin
router.get('/checkAdmin',authMiddlewares.authMiddleware, authController.checkAdmin);

module.exports = router;