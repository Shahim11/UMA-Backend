const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');

// Import controllers
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');


// Define routes and link to controllers
// Register a new user
router.post('/register', registerController.register);

// Login a user
router.post('/login', loginController.login);


module.exports = router;