const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserProfile
} = require('../controllers/auth.controller');
const {
    isAuthenticateUser,
} = require('../middlewares/auth.middleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/password/forgot', forgotPassword);
router.get('/logout', logoutUser);
router.put('/password/reset/:token', resetPassword);
router.get('/me', isAuthenticateUser, getUserProfile);

module.exports = router;