const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/password/forgot', forgotPassword);
router.get('/logout', logoutUser);
router.put('/password/reset/:token', resetPassword);

module.exports = router;