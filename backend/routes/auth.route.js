const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
 //   getUsers
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
router.put('/password/update', isAuthenticateUser, updatePassword);
router.put('/me/update', isAuthenticateUser, updateProfile);
//router.get('/admin/users', isAuthenticateUser, getUsers);
module.exports = router;