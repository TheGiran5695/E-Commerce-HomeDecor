const express = require('express');
const router = express.Router();
const { signup, signin, updateUser } = require('../controllers/authController');

router.post('/Signup', signup);
router.post('/Signin', signin);

// Update User Route
router.put('/:id', updateUser);

module.exports = router;
