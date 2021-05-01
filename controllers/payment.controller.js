const catchAsyncErrors = require('../middlewares/catchAsyncErrors.middleware')


exports.processPayment = catchAsyncErrors(async (req, res, next) => {

    

    res.status(200).json({
        success: true,
        //client_secret: paymentIntent.client_secret
    })

})

// Send stripe API Key   =>   /api/v1/stripeapi
// exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {

//     res.status(200).json({
//         stripeApiKey: process.env.STRIPE_API_KEY
//     })

// })