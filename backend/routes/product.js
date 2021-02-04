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

const {
    isAuthenticateUser,
    authorizeRoles
} = require('../middlewares/auth');

router.post('/admin/product/new',authorizeRoles('admin'), newProduct);
router.delete('/admin/delAllProducts', authorizeRoles('admin'), deleteAllProducts); // warning: delete all products in DB
router.route('/admin/product/:id')
    .put(isAuthenticateUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticateUser, authorizeRoles('admin'), deleteProduct);

router.route('/products').get(isAuthenticateUser, authorizeRoles('admin'), getProducts);
router.get('/product/:id', getSingleProduct);


module.exports = router;