const Product = require('../models/product.model');
//const { param } = require('../routes/product');
const ErrorHandle = require('../utils/errorHandle');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.middleware');
const APIFeatures = require('../utils/appFeatures');

// create new product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors (async (req, res, next) => {
    req.body.user = req.user.id; // lay tu isAuthenticateUser dong 13
    const c_product = await Product.create(req.body);
    res.status(200).json({
        success: true,
        c_product
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

    const g_products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: g_products.length,
        productCount,
        g_products
    })
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

        let u_product = await Product.findOne({ _id: id }).exec();

        if (!u_product) return next(new ErrorHandle('Product not found', 404 ));
        u_product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        return res.status(200).json({
            success: true,
            messsage: 'Product Updated !',
            u_product
        })
        
    } catch(error) {
        return next(new ErrorHandle('Product not found', 404 ));
    }
})

// delete product => api/v1/admin/product:id
exports.deleteProduct = catchAsyncErrors (async (req, res, next) => {
    const { id } = req.params

    try {
        const d_product = await Product.findOne({ _id: id }).exec();
        if (!d_product) return next(new ErrorHandle('Product not found', 404 ));
        await d_product.remove();

        return res.status(200).json({
            success: true,
            messsage: 'Product Deleted !',
            d_product
        })
    } catch(error) {
        return next(new ErrorHandle('Product not found', 404 ));
    }
})

