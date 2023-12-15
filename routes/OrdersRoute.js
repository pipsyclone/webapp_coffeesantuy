import express from "express";
import { 
    setOrders 
} from "../controllers/OrdersControllers.js";

const router = express.Router()

router.post('/order/set', setOrders)

export default router;