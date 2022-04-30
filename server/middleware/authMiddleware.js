import jwt from "jsonwebtoken"
import expressAsyncHandler from "express-async-handler";

import User from "../models/userModel.js"

export const isAuth = expressAsyncHandler(async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization && authorization.startsWith("Bearer")) {
            
        try {
                const token = authorization.split(" ")[1];                         // gets XXXXXX from "Bearer XXXXXX "
                const decode=jwt.verify(token,process.env.JWT_SECRET,)

                req.user= await User.findById(decode.id).select("-password")

                next();    
      } 
      catch (error) {
              res.status(401)
              throw new Error("Invalid Token/No Token")
              
      }
    }

      
})