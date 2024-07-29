import express from "express";
import { placeOrder } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";
import { verifyOrder } from "../controllers/orderController.js"
import { userOrders } from "../controllers/orderController.js";
import { updateStatus } from "../controllers/orderController.js";



const orderRouter=express.Router();


orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userOrders",authMiddleware,userOrders);
orderRouter.post("/status",updateStatus);
export default orderRouter;



