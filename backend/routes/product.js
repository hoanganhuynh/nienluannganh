const express = require('express');
const router = express.Router();

const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts
} = require('../controllers/productController');

router.post('/admin/product/new', newProduct);
router.delete('/admin/delAllProducts', deleteAllProducts); // warning: delete all products in DB
router.get('/products', getProducts);
router.get('/product/:id', getSingleProduct);

router.route('/admin/product/:id')
    .put(updateProduct)
    .delete(deleteProduct);


module.exports = router;