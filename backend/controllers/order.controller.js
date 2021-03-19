const Order = require('../models/order.model');
const Product = require('../models/product.model');

const ErrorHandle = require('../utils/errorHandle');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.middleware');
const APIFeatures = require('../utils/appFeatures');

// create new order => api/v1/order/new
exports.newOrder = catchAsyncErrors( async( req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;
    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
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

// get process order => api/v1/admin/order/id
exports.updateOrders = catchAsyncErrors( async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    
    if(order.orderStatus === 'Delivered') return next(new ErrorHandle('You have already delivered this order', 400))

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
    order.deliveredAt = Date.now()

    await order.save()
    
    res.status(200).json({
        success: true,
        message:"Change status order successfuly !"
    })
})
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false })
}

// delete order
exports.deleteOrder = catchAsyncErrors( async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if(!order) return next(new ErrorHandle(`No order found with ID ${req.params.id}`, 404))

    await order.remove()

    res.status(200).json({
        success: true,
        message: `Remove Order ID: ${req.params.id} successfully !`
    })
})


exports.deleteAllOrders = catchAsyncErrors(async (req, res, next) => {
    try {
        await Order.deleteMany();
        return res.status(200).json({
            success: true,
            messsage: 'All orders Deleted !'
        })
    } catch (error) {
        return next(new ErrorHandle('ERROR: 404', 404));
    }
})