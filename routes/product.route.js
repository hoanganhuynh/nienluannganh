const express = require('express');
const router = express.Router();

const {
    getProducts,
    newProduct,
    newCategory,
    getSingleProduct,
    updateProduct,
    updateCategory,
    deleteProduct,
    deleteCategory,
    deleteAllProducts,
    createNewReview,
    getProductReviews,
    deleteReview,
    getAdminProducts,
    getAdminCategories,
} = require('../controllers/product.controller');

const {
    isAuthenticateUser,
    authorizeRoles
} = require('../middlewares/auth.middleware');


router.post('/admin/product/new',isAuthenticateUser, authorizeRoles('admin'), newProduct);
router.post('/admin/category/new',isAuthenticateUser, authorizeRoles('admin'), newCategory);
router.route('/admin/products').get(getAdminProducts);
router.route('/admin/categories').get(getAdminCategories);
router.delete('/admin/delAllProducts',isAuthenticateUser, authorizeRoles('admin'), deleteAllProducts); // warning: delete all products in DB
router.route('/admin/product/:id')
    .put(isAuthenticateUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticateUser, deleteProduct);

router.route('/admin/category/:id')
    .put(isAuthenticateUser, authorizeRoles('admin'), updateCategory)
    .delete(isAuthenticateUser, deleteCategory);    

router.route('/products').get(getProducts);
router.get('/product/:id', getSingleProduct);

router.put('/review', isAuthenticateUser, createNewReview);
router.get('/reviews', isAuthenticateUser, getProductReviews);
router.delete('/reviews', isAuthenticateUser, deleteReview);

module.exports = router;
