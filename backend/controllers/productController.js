const Product = require('../models/product');
//const { param } = require('../routes/product');

// create new product => /api/v1/admin/product/new
exports.newProduct = async (req, res, next) => {
    const c_product = await Product.create(req.body);
    res.status(200).json({
        success: true,
        c_product
    })
}

// get all products => /api/v1/products 
exports.getProducts = async (req, res, next) => {
    const g_products = await Product.find();
    res.status(200).json({
        success: true,
        count: g_products.length,
        g_products
    })
}


// get: single product => /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
    const { id } = req.params

    try {

        const product = await Product.findOne({ _id: id }).exec();

        if (!product) return res.status(404).json({ Error: "Product not found" })

        return res.status(200).json({ product })
    } catch(error) {
        return res.status(400).json({ Error: "Product not found" })
    }
}

// update product => api/v1/admin/product:id
exports.updateProduct = async (req, res, next) => {
    const { id } = req.params

    try {

        let u_product = await Product.findOne({ _id: id }).exec();

        if (!u_product) return res.status(404).json({ Error: "Product not found" })
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
        return res.status(404).json({ Error: "Product not found" })
    }
}

// delete product => api/v1/admin/product:id
exports.deleteProduct = async (req, res, next) => {
    const { id } = req.params

    try {

        const d_product = await Product.findOne({ _id: id }).exec();

        if (!d_product) return res.status(404).json({ Error: "Product not found" })
        await d_product.remove();

        return res.status(200).json({
            success: true,
            messsage: 'Product Deleted !',
            d_product
        })
    } catch(error) {
        return res.status(400).json({ Error: "Product not found" })
    }
}


