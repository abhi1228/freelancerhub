import express from 'express';
import { verifyToken } from "../middleware/jwt.js";
import { getOrders ,intent,confirm} from "../controllers/order.controller.js";

const router=express.Router();

router.get("/", verifyToken, getOrders);
//router.post("/:gigId", verifyToken, createOrder);
router.put("/", verifyToken, confirm);
router.post("/create-payment-intent/:id", verifyToken, intent);


export default router;