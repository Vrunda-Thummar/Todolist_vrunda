const express = require('express'); 
const router = express.Router(); 
const authController = require('../controller/auth.controller'); 
 
// Register routes 
router.get('/register', authController.getRegister); 
router.post('/register', authController.post); 
 
// Login routes 
router.get('/login', authController.get); 
router.post('/login', authController.post); 
 
// Logout route 
router.get('/logout', authController.logout); 
 
module.exports = router;