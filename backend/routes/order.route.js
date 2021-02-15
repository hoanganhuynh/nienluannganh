const express = require('express');
const router = express.Router();

const { newOrder,
    getSingleOrder,
    myOrders,
    getAllOrder,
    updateOrders,
    deleteOrder
} = require('../controllers/order.controller')

const {
    isAuthenticateUser,
    authorizeRoles
} = require('../middlewares/auth.middleware');

router.post('/order/new', isAuthenticateUser, newOrder);
router.get('/order/:id', isAuthenticateUser, getSingleOrder);
router.get('/orders/me', isAuthenticateUser, myOrders);
router.get('/admin/orders', isAuthenticateUser, authorizeRoles('admin'), getAllOrder);

router.put('/admin/order/:id', isAuthenticateUser, authorizeRoles('admin'), updateOrders);
router.delete('/admin/order/:id', isAuthenticateUser, authorizeRoles('admin'), deleteOrder);

module.exports = router;

