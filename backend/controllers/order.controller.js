const Order = require('../models/order.model');
const Product = require('../models/product.model');

const ErrorHandle = require('../utils/errorHandle');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.middleware');
const APIFeatures = require('../utils/appFeatures');

// create new order => api/v1/order/new
exports.newOrder = catchAsyncErrors( async( req, res, next) => {
    const {
        itemPrice,
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;
    const order = await Order.create({
        itemPrice,
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })
    res.status(200).json({
        success: true,
        order
    })
})

// get single order => api/v1/order/id
exports.getSingleOrder = catchAsyncErrors( async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if(!order) return next(new ErrorHandle(`No order found with ID ${req.params.id}`, 404))
    res.status(200).json({
        success: true,
        order
    })
})
// get logged in user orders => api/v1/orders/me
exports.myOrders = catchAsyncErrors( async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })
    if(!orders) return next(new ErrorHandle(`No order found with ID ${req.params.id}`, 404))
    res.status(200).json({
        success: true,
        orders 
    })
})
// get all order => api/v1/admin/orders
exports.getAllOrder = catchAsyncErrors( async (req, res, next) => {
    const orders = await Order.find()
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })
    res.status(200).json({
        success: true,
        countOrders: orders.length,
        totalAmount,
        orders
    })
})