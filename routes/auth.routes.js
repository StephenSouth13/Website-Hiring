// NOTE: Định tuyến cho các chức năng xác thực.
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/register', authController.showRegisterForm);
router.post('/register', authController.register);
router.get('/login', authController.showLoginForm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;