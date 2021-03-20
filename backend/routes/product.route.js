const express = require('express');
const router = express.Router();

const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
    createNewReview,
    getProductPreviews,
    deleteReview,
    getAdminProducts
} = require('../controllers/product.controller');

const {
    isAuthenticateUser,
    authorizeRoles
} = require('../middlewares/auth.middleware');


router.post('/admin/product/new',isAuthenticateUser, authorizeRoles('admin'), newProduct);
router.route('/admin/products').get(getAdminProducts);
router.delete('/admin/delAllProducts',isAuthenticateUser, authorizeRoles('admin'), deleteAllProducts); // warning: delete all products in DB
router.route('/admin/product/:id')
    .put(isAuthenticateUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticateUser, deleteProduct);

router.route('/products').get(getProducts);
router.get('/product/:id', getSingleProduct);

router.put('/review', isAuthenticateUser, createNewReview);
router.get('/reviews/:id', isAuthenticateUser, getProductPreviews);
router.delete('/reviews', isAuthenticateUser, deleteReview);

module.exports = router;
