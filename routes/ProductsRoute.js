import express from "express";
import { 
    setProducts,
    getAllProducts,
    getProductsById,
    searchProducts,
    updateProducts,
    removeAllProducts,
    removeProducts
} from "../controllers/ProductsControllers.js";

const router = express.Router()

router.post('/product/set', setProducts)
router.get('/product', getAllProducts)
router.get('/product/:productid', getProductsById)
router.get('/product/search/:keyword', searchProducts)
router.put('/product/update/:productid', updateProducts)
router.delete('/product/remove-all', removeAllProducts)
router.delete('/product/remove/:productid', removeProducts)

export default router;