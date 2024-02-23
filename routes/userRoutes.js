const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/authenticate', userController.authenticateUser);
router.get('/signup', userController.showSignup);
router.get('/', userController.showLogin);

module.exports = router;