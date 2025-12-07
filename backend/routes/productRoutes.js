const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// RESTful API routes
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Legacy routes (for backward compatibility)
router.get('/', productController.getProductsLegacy);
router.get('/:id', productController.getProductByIdLegacy);
router.post('/add', productController.createProductLegacy);
router.put('/update/:id', productController.updateProductLegacy);
router.delete('/delete/:id', productController.deleteProductLegacy);

module.exports = router;

