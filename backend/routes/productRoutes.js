import express from "express"
const router = express();
import { allProducts, singleProductDetails, deleteProduct, updateProduct, createProduct, createProductReview, getTopProducts } from "../controllers/productController.js"
import { admin, protect } from '../middleware/authMiddleware.js';


router.route('/').get(allProducts).post(protect, admin, createProduct)
router.get('/top', getTopProducts) 
router.route('/:id').get(singleProductDetails).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)
router.route('/:id/reviews').post(protect, createProductReview)

export default router;