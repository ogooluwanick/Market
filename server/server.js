import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import  path  from "path";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import productRouter from "./routers/productRoutes.js";
import userRouter from "./routers/userRoutes.js";
import orderRouter from "./routers/orderRoutes.js";
import uploadRouter from "./routers/uploadRoutes.js";




const app=express()
dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))       //increase data limit for file64 data convert
app.use(express.json());
app.use(express.urlencoded({extended:true }));
app.use(
    cors({
        origin:"*",
        credentials:true,                                                                                       //access-control-allow-credentials:true
        optionSuccessStatus:200,

    })
)


mongoose.connect(process.env.MONGODB_URL)




// router calls
app.use('/users',userRouter)
app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.get("/api/3rdPartyPayment/paypal", (req,res)=> res.send(process.env.PAYPAL_CLIENT_ID))

// app.use('/uploads', uploadRouter);
// const __dirname=path.resolve()
// app.use("/uploads",express.static(path.join(__dirname,"/uploads")))




app.get('/', (req,res)=>{
    res.send('Server is ready')
});




app.use(notFound)
app.use(errorHandler)


// app.get((err,req,res,next)=>{
//     res.satus(500).send({message:err.message}) 
// })

const port= process.env.PORT||3000;

app.listen(port, ()=>{
    console.log(`Server at http://localhost:${port}`)
    
})

