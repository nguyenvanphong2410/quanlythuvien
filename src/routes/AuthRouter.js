const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.post('/login', authController.loginEmployee);
router.get('/logout', authController.logoutEmployee);
router.post('/refresh-token', authController.refreshToken);


module.exports = router;
