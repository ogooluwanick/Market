import express from 'express';
import expressAsyncHandler from "express-async-handler"
import { isAdmin, isAuth } from '../middleware/authMiddleware.js';


import Product from "../models/productModel.js"

const productRouter= express.Router();

// @desc  fetch all products
// @route get /products
// @access Public
productRouter.get('/',expressAsyncHandler(async(req,res)=>{
        const products= await Product.find({})
        
        res.json(products);
 }));



// @desc  fetch single products
// @route get /products/:id
// @access Public
productRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
        const {id }= req.params
        const product= await Product.findById(id)
        
        if(product){
                res.json(product);
        }
        else{
                res.status(404)
                throw new Error("This Product Not Found!")
        }        
}));

// @desc  create single product
// @route post /products/:id
// @access private/admin
productRouter.post('/',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
        
        const product= new Product({
                name:"Sample name",
                user:req.user._id,
                description:"Sample description",
                brand:"Sample brand",
                category:"Sample category"
        })
        
        if(product){
                const createdProduct=await product.save()
                res.status(201).json(createdProduct);
        }
        else{
                res.status(404)
                throw new Error("Failed to Create Product ")
        }        
}));

// @desc  update created product
// @route put /products/:id
// @access private/admin
productRouter.put('/:id',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
        const {name,image,showcaseImgs,description,brand, category,price,countInStock,rating, reviews,numReviews,} =req.body
        const {id:_id }= req.params

        const product= await Product.findById(_id)


        if(product){
                product.name=name,
                product.description=description,
                product.brand=brand,
                product.category=category,
                product.image=image,
                product.showcaseImgs=[...product.showcaseImgs,showcaseImgs],
                product.price =price,
                product.countInStock =countInStock

                const updatedProduct=await product.save()
                res.status(201).json(updatedProduct);
        }
        else{
                res.status(404)
                throw new Error("Product not found")
        }        
}));



// @desc  delete single products
// @route delete /products/:id
// @access Public
productRouter.delete('/:id', isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
        const {id:_id }= req.params
        const product= await Product.findById(_id)
        
        if(product){
                await product.remove()
                res.json({message:"Product  Deleted"})

        }
        else{
                res.status(404)
                throw new Error("This Product Not Found!")
        }        
}));

export default productRouter;