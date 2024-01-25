import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router()

router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)
router.get('/get-product', getProductController)
router.get('/get-product/:slug', getSingleProductController)
router.get('/product-photo/:pid', productPhotoController)
router.delete('/delete-product/:pid', deleteProductController)
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

//filter product
router.post('/product-filters', productFilterController)

// product count 
router.get('/product-count', productCountController)

// Product per page 
router.get('/product-list/:page', productListController)

// search Product
router.get('/search/:keyword', searchProductController)

// similar product
router.get('/related-product/:pid/:cid', relatedProductController)

// category wise product
router.get('/product-category/:slug', productCategoryController)

// Payment routes 
// token
router.get('/braintree/token', braintreeTokenController)

// payments 
router.post('/braintree/payment', requireSignIn, braintreePaymentController)

export default router
