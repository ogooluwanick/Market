import bcrypt from 'bcryptjs';
import express from 'express';
import expressAsyncHandler from "express-async-handler"

import User from "../models/userModel.js"
import { generateToken } from '../utils.js';
import { isAdmin, isAuth } from '../middleware/authMiddleware.js';
import mongoose from 'mongoose';

const userRouter= express.Router();



// @desc  display all users for admins 
// @route get /users/listusers
// @access private/admin
userRouter.get('/listusers', isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
        const users= await User.find({}) 
        res.send(users);
})) 

// @desc  get user by id for admins 
// @route get /users/:id
// @access private/admin
userRouter.get('/:id', isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
        const {id}= req.params
        const user= await User.findById(id).select("-password")
        if (user){
                res.send(user);
        }
        else{
                res.status(401)
                throw new Error("User not found")
        }
})) 

// @desc  delete a user for admins 
// @route get /users/:id
// @access private/admin
userRouter.delete('/:id', isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
        const {id:_id} =req.params        

        if (mongoose.Types.ObjectId.isValid(_id)){
                await User.findByIdAndRemove(_id)
                res.json({message:"User Deleted"})
             }
             else {
                 res.status(404).send({message: "This User Not Found!'"})
             }
})) 


// @desc  update any user
// @route put /users/updateuser/:id
// @access private/ admin
userRouter.put('/updateuser/:id',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
        const {id}= req.params
        const {firstName,lastName,email,phone,avater,isAdmin}= req.body
        let name = String(firstName + " " + lastName)

        const user= await User.findById(id) 

        if (user){
                user.name=name || user.name                             //if nothing comes from client put what was there b4 back
                user.isAdmin = req.body.isAdmin  
                user.email=email || user.email
                user.phone=phone || user.phone
                user.avater=avater || user.avater
                
                const updatedUser=await user.save()

                res.send({
                        _id:updatedUser._id,
                        name:updatedUser.name,
                        email:updatedUser.email,
                        phone:updatedUser.phone,
                        isAdmin:updatedUser.isAdmin,
                        avater:updatedUser.avater,
                    });
        }
        else{
                res.status(404)
                throw new Error("User not Found")
        }
        
       

}));


// @desc  Auth user && get token
// @route post /users/login
// @access Public
userRouter.post('/login',expressAsyncHandler(async(req,res)=>{
        let {email,password} =req.body
        email=String(email).toLowerCase()
        password=String(password)

        const user= await User.findOne({email}) 
        if(user){
            if(bcrypt.compareSync(password, user.password)){
                res.send({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    isAdmin:user.isAdmin,
                    avater:user.avater,
                    
                    token:    generateToken(user._id) 
                });
                return;
            }
        }
        res.status(401)
        throw new Error("Invalid Email/Password")

}));

// @desc  Get user profile
// @route post /users/profile
// @access Private
userRouter.get('/profile',isAuth,expressAsyncHandler(async(req,res)=>{
        const user= await User.findById(req.user._id) 
        if (user){
                res.send({
                        _id:user._id,
                        name:user.name,
                        email:user.email,
                        isAdmin:user.isAdmin,
                        avater:user.avater,
                        
                })
        }
        else{
                res.status(404)
                throw new Error("User not Found")
        }
}));

// @desc  update a users profile
// @route put /users/updateprofile
// @access private
userRouter.put('/updateprofile',isAuth,expressAsyncHandler(async(req,res)=>{
        const {firstName,lastName,email,password,avater}= req.body
        let name = String(firstName + " " + lastName)

        const user= await User.findById(req.user._id) 

        if (user){
                user.name=name || user.name                             //if nothing comes from client put what was there b4 back
                user.email=email || user.email
                user.phone=phone || user.phone
                user.avater=avater || user.avater

                if(password){
                        user.password=bcrypt.hashSync(String(password),10)
                }

                const updatedUser=await user.save()

                res.send({
                        _id:updatedUser._id,
                        name:updatedUser.name,
                        email:updatedUser.email,
                        isAdmin:updatedUser.isAdmin,
                        avater:updatedUser.avater,
                        token:    generateToken(updatedUser._id) 
                    });
        }
        else{
                res.status(404)
                throw new Error("User not Found")
        }
        
       

}));


    

// @desc  Create new user Auth  && get token
// @route post /users/register
// @access Public
userRouter.post('/register',expressAsyncHandler(async(req,res)=>{
        const {firstName,lastName,password,email,phone}= req.body
        let name = String(firstName + " " + lastName)
        
        
        const userExists= await User.findOne({email})
        
        if (userExists){
                res.status(400)
                throw new Error("User Already Exist")
        }
        else {
                const user= new User({name:String(name), email:String(email),phone:String(phone), password:bcrypt.hashSync(String(password),10)})
                if(user){
                        const createdUser= await user.save();
                        res.send({
                                _id:createdUser._id,
                                name:createdUser.name,
                                avater:createdUser.avater,
                                email:createdUser.email,
                                isAdmin:createdUser.isAdmin,                
                                token: generateToken(createdUser._id)
                        })
                }
                else{
                        res.status(400)
                        throw new Error("Registration Error")
                }
                
        }

}))




// userRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
// const user = await User.findById(req.body.id);
// if (user){
//         res.send(user)
// }
// else{
//         res.status(404).send({message:"User Not Found"})
// }
// }))



export default userRouter;