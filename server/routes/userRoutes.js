import express from 'express';
import expressAsyncHandler from "express-async-handler"


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
        const product= await Product.findById(String(req.params.id))
        
        if(product){
                res.json(product);
        }
        else{
                res.status(404).send({message: "This Product Not Found!'"})
        }        
}));

export default productRouter;