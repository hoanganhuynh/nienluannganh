const express = require('express');
const router = express.Router();

const { newOrder,
    getSingleOrder,
    myOrders,
    allOrders,
    updateOrders,
    deleteOrder,
    deleteAllOrders
} = require('../controllers/order.controller')

// const { newCoupon } = require('../controllers/discount.controller')

const {
    isAuthenticateUser,
    authorizeRoles
} = require('../middlewares/auth.middleware');

router.post('/order/new', isAuthenticateUser, newOrder);
router.get('/order/:id', isAuthenticateUser, getSingleOrder);
router.get('/orders/me', isAuthenticateUser, myOrders);
router.get('/admin/orders', isAuthenticateUser, authorizeRoles('admin'), allOrders);
router.get('/admin/orders', isAuthenticateUser, authorizeRoles('admin'), allOrders);
router.delete('/admin/order/:id', isAuthenticateUser, authorizeRoles('admin'), deleteOrder);


router.put('/order/:id', isAuthenticateUser, updateOrders);
// router.post('/admin/newCoupon', isAuthenticateUser, authorizeRoles('admin'), newCoupon);

router.delete('/admin/delAllOrders',isAuthenticateUser, authorizeRoles('admin'), deleteAllOrders);

module.exports = router;

