const Product = require('../models/product.model');
//const { param } = require('../routes/product');
const ErrorHandle = require('../utils/errorHandle');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.middleware');
const APIFeatures = require('../utils/appFeatures');
//const dateFormat = require('dateformat');

// create new product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors (async (req, res, next) => {
    req.body.user = req.user.id; // lay tu isAuthenticateUser dong 13
    console.log('hello em yeu',req.body);
    const product = await Product.create(req.body);
    res.status(200).json({
        success: true,
        product
    })
})

// delete all products in database => /api/v1/admin/delAllProducts
exports.deleteAllProducts = catchAsyncErrors (async (req, res, next) => {
    try {
        await Product.deleteMany();
        return res.status(200).json({
            success: true,
            messsage: 'All products Deleted !'
        })
    } catch (error) {
        return next(new ErrorHandle('ERROR: 404', 404 ));
    }
})

// get all products => /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors (async (req, res, next) => {

    const resPerPage = 2; // limit product show in each page
    const productCount = await Product.countDocuments();
    const apiFeatures = new APIFeatures(Product.find(), req.query)
                        .search()
                        .filter()
                        .pagination(resPerPage)

    const products = await apiFeatures.query;
    setTimeout(() => {
        res.status(200).json({
            success: true,
            productCount,
            products
        })
    }, 1000)
})


// get: single product => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors (async (req, res, next) => {
    const { id } = req.params

    try {
        const product = await Product.findOne({ _id: id });
        if (!product) return next(new ErrorHandle('Product not found', 404 ));
        return res.status(200).json({ product })
    } catch(error) {
        return next(new ErrorHandle('Product not found', 404 ));
    }
})

// update product => api/v1/admin/product:id
exports.updateProduct = catchAsyncErrors (async (req, res, next) => {
    const { id } = req.params

    try {

        let product = await Product.findOne({ _id: id }).exec();

        if (!product) return next(new ErrorHandle('Product not found', 404 ));
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        return res.status(200).json({
            success: true,
            messsage: 'Product Updated !',
            product
        })
        
    } catch(error) {
        return next(new ErrorHandle('Product not found', 404 ));
    }
})

// delete product => api/v1/admin/product:id
exports.deleteProduct = catchAsyncErrors (async (req, res, next) => {
    const { id } = req.params

    try {
        const product = await Product.findOne({ _id: id }).exec();
        if (!product) return next(new ErrorHandle('Product not found', 404 ));
        await product.remove();

        return res.status(200).json({
            success: true,
            messsage: 'Product Deleted !',
            product
        })
    } catch(error) {
        return next(new ErrorHandle('Product not found', 404 ));
    }
})

// create new review => api/v1/review
exports.createNewReview = catchAsyncErrors( async (req, res, next) => {
    //var date = dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT");
    const { rating, comment, createdAt, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        createdAt: Date.now(),
        comment
    }

    const product = await Product.findById(productId);

    // console.log(product.reviews);
    const isReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

    // check user reviewd
    if(isReviewed) { // update comment + rating
        product.reviews.forEach(review => {
            if(review.user.toString() === req.user._id.toString()){
                 review.comment = comment;
                 review.rating = rating;
                 review.createdAt = createdAt;
            }
        })
    } else { // add new review of new user to db
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Send review successfully !"
    })
})

// get all reviews of product by id
exports.getProductPreviews = catchAsyncErrors( async( req, res, next) => {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
        success: true,
        count: product.reviews.length,
        reviews: product.reviews
    })
})

// delete review of product by id
exports.deleteReview = catchAsyncErrors( async( req, res, next) => {
    const product = await Product.findById(req.query.productId);
    
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());
    //if(!req.params.id) return next(new ErrorHandle('Review Not Found', 404))
    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, 
    {
        reviews, 
        ratings, 
        numOfReviews
    },
    {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    
    res.status(200).json({
        success: true,
        message: `Delete review successfully`
    })
})
