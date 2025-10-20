import Oder from "../models/Oders.js";
import { isAdmin } from "./userController.js";

export  async function getOrders(req, res) {
    try{
        const orders = await Oder.find();
        res.status(200).json({
            orders: orders,
            status: "success"
        });
    } catch(error) {
        console.error("Error retrieving orders", error.message);
        res.status(500).json({
            message: "Error retrieving orders",
            status: "error"
        });
    }

}

// Get A Order Using By Id

export async function getOrderById(req, res) {
    try{
        const orderId = req.params.id;
        const order = await Oder.findOne({product_id: orderId});
        if(order == null){
            res.status(404).json({
                message: "Order not found",
                status: "error"
            });
            return;
        }
        else{
            res.status(200).json({
                order: order,
                status: "success"
            });
        }
    } catch(error) {
        console.error("Error retrieving order", error.message);
        res.status(500).json({
            message: "Error retrieving order",
            status: "error"
        });
    }
}


export  async function createOrder(req, res) {
    if(!isAdmin(req)){
      res.status(403).json({
        message: "You are not authorized to create an order",
        status: "error",
      });
      return;
    }
    try{
        const orderData = req.body;
        const newOrder = new Oder(orderData);
        await newOrder.save();

        res.status(201).json({
            message: "New order created successfully",
            status: "success"
        });
    } catch(error) {
        console.error("Error creating A New  order", error.message);
        res.status(500).json({
            message: "Error creating A new  order",
            status: "error"
        });
    }
  
}

export  async function deleteOrder(req, res) {
    if(!isAdmin(req)){
      res.status(403).json({
        message: "You are not authorized to delete an order",
        status: "error",
      });
      return;
    }
    try{
        const orderId = req.params.id;

        await Oder.deleteOne({
            product_id: orderId
        })

        res.status(200).json({
            message: "Order deleted successfully",
            status: "success"
        });

    }
    catch(error){
        console.error("Error deleting order", error.message);
        res.status(500).json({
            message: "Error deleting order",
            status: "error"
        });
    }

  

}

export async function updateOrder(req, res) {
    if(!isAdmin(req)){
      res.status(403).json({
        message: "You are not authorized to update an order",
        status: "error",
      });
      return;
    }   
    try{
        const orderId = req.params.orderId;
        const updateData = req.body;

        await Oder.updateOne({product_id: orderId}, {$set: updateData});

        res.status(200).json({
            message: "Order updated successfully",
            status: "success"
        });
    }
    catch(error){
        console.error("Error updating order", error.message);
        res.status(500).json({
            message: "Error updating order",
            status: "error"
        });
    }
}
