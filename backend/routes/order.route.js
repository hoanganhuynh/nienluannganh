const express = require('express');
const router = express.Router();

const { newOrder,
    getSingleOrder,
    myOrders
} = require('../controllers/order.controller')

const {
    isAuthenticateUser,
    authorizeRoles
} = require('../middlewares/auth.middleware');

router.post('/order/new', isAuthenticateUser, newOrder);
router.get('/order/:id', isAuthenticateUser, getSingleOrder);
router.get('/orders/me', isAuthenticateUser, myOrders);

module.exports = router;

