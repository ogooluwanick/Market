import bcrypt from 'bcryptjs';
import express from 'express';
import expressAsyncHandler from "express-async-handler"


import User from "../models/userModel.js"
import { generateToken } from '../utils.js';

const userRouter= express.Router();



// @desc  display all users for admins 
// @route get /users/display
// @access Public
// userRouter.get('/display', expressAsyncHandler(async(req,res)=>{
//         const users= await User.find({}) 
//         res.send(users);
// })) 

// @desc  Auth user && get token
// @route post /users/login
// @access Public
userRouter.post('/login',expressAsyncHandler(async(req,res)=>{
        const {email,password} =req.body
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
    


userRouter.post('/register',expressAsyncHandler(async(req,res)=>{
        const {name,password,email,avater,}= req.body
        const user= new User({name:name, email:email, password:bcrypt.hashSync(password,10),avater:avater})
        const createdUser= await user.save();
        res.send({
                _id:createdUser._id,
                name:createdUser.name,
                avater:createdUser.avater,
                email:createdUser.email,
                isAdmin:createdUser.isAdmin,                
                token: null/*generateToken(createdUser)*/
        })

}))

userRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
const user = await User.findById(req.body.id);
if (user){
        res.send(user)
}
else{
        res.status(404).send({message:"User Not Found"})
}
}))



export default userRouter;