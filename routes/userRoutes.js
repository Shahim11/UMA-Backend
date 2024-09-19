const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authToken');

// Import controllers
const usersController = require('../controllers/usersController');
const blockController = require('../controllers/blockController');
const unblockController = require('../controllers/unblockController');
const deleteController = require('../controllers/deleteController');

// Define routes and link to controllers
// List all users
router.get('/users', authenticateToken, usersController.getUsers);

// Block selected users
router.post('/block', authenticateToken, blockController.blockUsers);

// Unblock selected users
router.post('/unblock', authenticateToken, unblockController.unblockUsers);

// Delete selected users
router.post('/delete', authenticateToken, deleteController.deleteUsers);


module.exports = router;