import express from 'express';
import expressAsyncHandler from "express-async-handler"

import { isAdmin, isAuth } from '../middleware/authMiddleware.js';
import Order from "../models/orderModel.js"

const orderRouter= express.Router();

// @desc  create order
// @route post /orders
// @access private 
orderRouter.post('/',isAuth,expressAsyncHandler(async(req,res)=>{
        const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice}= req.body
        if (orderItems && orderItems.length ===0){
                res.status(400)
                throw new Error("No order items")
        }
        else{
                const order= new Order ({user:req.user._id,orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice})
                const createdOrder=  await order.save()
                res.status(200).send(createdOrder)
        }
 }));


// @desc  Get logged in users all time orders
// @route get /orders/myorders
// @access private
orderRouter.get('/myorders',isAuth,expressAsyncHandler(async(req,res)=>{
        const userId= req.user._id
        const orders= await Order.find({user:userId})
        
        if(orders){
                res.json(orders);
        }
        else{
                res.status(404)
                throw new Error("Orders Not Found!")
        }   

}))

// @desc  return all orders admin
// @route get /orders/allorders
// @access private/admin
orderRouter.get('/allorders',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
        const orders= await Order.find({}).populate("user",  "_id name ")
        if(orders){
                res.json(orders);
        }
        else{
                res.status(404)
                throw new Error("No Orders yet Found!")
        }   

}))



// @desc  get single order by ID
// @route get /orders/:id
// @access private
orderRouter.get('/:id',isAuth,expressAsyncHandler(async(req,res)=>{
        const {id }= req.params
        const order= await Order.findById(id).populate("user",  "name email phone")
        
        if(order){
                res.json(order);
        }
        else{
                res.status(404)
                throw new Error("Order Not Found!")
        }        
}));





// @desc  update order to paid  by ID
// @route get /orders/:id/pay
// @access private
orderRouter.put('/:id/pay',isAuth,expressAsyncHandler(async(req,res)=>{
        const {id}= req.params
        const paymentData= req.body
        const order= await Order.findById(String(id))
        if(order){
                order.isPaid= true
                order.paidAt= Date.now()
                if (order.paymentMethod== "Paypal"){
                        order.paymentResult= {                                                                          //data being sent in from paypal
                                id:paymentData.id,                                                              
                                status:paymentData.status,
                                update_time:paymentData.update_time,
                                email_address:paymentData.email_address
                        }
                }
                else if(order.paymentMethod== "Paystack"){
                        order.paymentResult= {                                                                          //data being sent in from paystack
                                reference:paymentData.reference,                                                              
                                status:paymentData.status,
                                transaction:paymentData.transaction,
                                message:paymentData.message,
                        }
                }
                else{
                        order.paymentResult= {                                                                          //data being sent in from paystack
                                staff:paymentData.staff,  
                                staffID:paymentData.staffID,  
                                status:paymentData.status,   
                        }

                const updatedOrder=await order.save()
                res.json(updatedOrder);
                }
        }
        else{
                res.status(404)
                throw new Error("Order Not Found!")
        }        
}));
// @desc  update order to delivered  by ID
// @route get /orders/:id/deliver
// @access private
orderRouter.put('/:id/deliver',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
        const {id}= req.params
        const order= await Order.findById(String(id))
        if(order){
                order.isDelivered= true
                order.deliveredAt= Date.now()

                const updatedOrder=await order.save()
                res.json(updatedOrder);
        }
        else{
                res.status(404)
                throw new Error("Order Not Found!")
        }        
}));



export default orderRouter;