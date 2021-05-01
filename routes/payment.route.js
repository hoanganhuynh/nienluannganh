const express = require('express')
const router = express.Router();

const {
    processPayment,
    // sendStripApi
} = require('../controllers/payment.controller')

const {
    isAuthenticateUser
} = require('../middlewares/auth.middleware');

router.post('/payment/process', isAuthenticateUser, processPayment);
//router.route('/stripeapi').get(isAuthenticatedUser, sendStripApi);

module.exports = router;
