const express = require('express');
const router = express.Router();

const { newOrder,
    getSingleOrder,
    myOrders,
    getAllOrder
} = require('../controllers/order.controller')

const {
    isAuthenticateUser,
    authorizeRoles
} = require('../middlewares/auth.middleware');

router.post('/order/new', isAuthenticateUser, newOrder);
router.get('/order/:id', isAuthenticateUser, getSingleOrder);
router.get('/orders/me', isAuthenticateUser, myOrders);
router.get('/admin/orders', isAuthenticateUser, authorizeRoles('admin'), getAllOrder);

module.exports = router;

