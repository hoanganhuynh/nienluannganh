const Product = require('../models/product.model');

const ErrorHandle = require('../utils/errorHandle');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.middleware');
const APIFeatures = require('../utils/appFeatures');
const cloudinary = require('cloudinary')


// create new product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

// delete all products in database => /api/v1/admin/delAllProducts
exports.deleteAllProducts = catchAsyncErrors(async (req, res, next) => {
    try {
        await Product.deleteMany();
        return res.status(200).json({
            success: true,
            messsage: 'All products Deleted !'
        })
    } catch (error) {
        return next(new ErrorHandle('ERROR: 404', 404));
    }
})

// get all products => /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    //return next(new ErrorHandle('My Error',400));

    const resPerPage = 8; // limit product show in each page
    const productCount = await Product.countDocuments();
    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;

    apiFeatures.pagination(resPerPage)
    products = await apiFeatures.query;
    
    setTimeout(() => {
        res.status(200).json({
            success: true,
            productCount,
            resPerPage,
            products,
            filteredProductsCount
        })
    }, 400)
})

// Get all products (Admin)  =>   /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find();
    setTimeout(() => {
        res.status(200).json({
            success: true,
            products
        })
    }, 400) 
})


// get: single product => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    //const { id } = req.params

    try {
        const product = await Product.findById(req.params.id);
        if (!product) return next(new ErrorHandle('Product not found', 404));
        return setTimeout(() => {res.status(200).json({ product })}, 400)
    } catch (error) {
        return next(new ErrorHandle('Product not found', 404));
    }
})

// Update Product   =>   /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {

        // Deleting images associated with the product
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks

    }



    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })

})

// Delete Product   =>   /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    // Deleting images associated with the product
    for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Product is deleted.'
    })

})

// create new review => api/v1/review
exports.createNewReview = catchAsyncErrors(async (req, res, next) => {
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
    if (isReviewed) { // update comment + rating
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
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
exports.getProductPreviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
        success: true,
        count: product.reviews.length,
        reviews: product.reviews
    })
})

// delete review of product by id
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
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
