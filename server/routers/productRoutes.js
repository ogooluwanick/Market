import express from 'express';
import { request } from 'express';
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

// @desc  create new review 
// @route post /products/:id/reviews
// @access private
productRouter.post('/:id/reviews',isAuth,expressAsyncHandler(async(req,res)=>{
        const {rating,comment} =req.body
        const {id:_id }= req.params

        const product= await Product.findById(_id)


        if(product){
                const reviewedBefore= product.reviews.find((review)=>review.user.toString()=== req.user._id.toString())

                if (reviewedBefore){
                        res.status(400)
                        throw Error("Product Already Reviewed")

                }
                const review={
                        name:req.user.name,
                        rating:Number(rating),
                        comment:comment,
                        user:req.user._id,
                }
                

                product.reviews.push(review)
                product.numReviews= product.reviews.length

                product.rating=product.reviews.reduce((item,acc)=>item.rating+acc,0)/product.numReviews
                product.rating =Number(product.rating)
                
                console.log("product",product.rating)

                
                
                
                await product.save()
                res.status(201).json({message:"review Added"});
        }
        else{
                res.status(404)
                throw new Error("Product not found")
        }        
}));



// @desc  delete single products
// @route delete /products/:id
// @access Public/admin
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