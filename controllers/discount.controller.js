const Discount = require('../models/discount.model');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.middleware');


// register user => /api/v1/admin/discount/register
exports.newCoupon = catchAsyncErrors(async (req, res, next) => {

    const { code, percent, numOfDate, discountExpire } = req.body;

    let createdAt = Date.now()
    
    // discountExpire = discountExpire.setDate(createdAt.getDate() + numOfDate)

    const coupon = await Discount.create({
        code,
        percent,
        discountExpire
    })

    res.status(200).json({
        success: true,
        coupon
    })
})