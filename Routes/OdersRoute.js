import express from "express";


import { getOrders ,getOrderById, createOrder, deleteOrder, updateOrder } from "../Controllers/OdersController.js";

const ordersRoute = express.Router();

ordersRoute.get("/", getOrders);
ordersRoute.get("/:id", getOrderById);  
ordersRoute.delete("/:id", deleteOrder);
ordersRoute.put("/:id", updateOrder);
ordersRoute.post("/", createOrder);

export default ordersRoute;