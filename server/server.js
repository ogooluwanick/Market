import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import { products } from "./data/products.js";



const app=express()
dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))  //increase data limit for file64 data convert
app.use(express.json());
app.use(express.urlencoded({extended:true }));
app.use(
    cors({
        origin:"*",
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus:200,

    })
)


mongoose.connect(process.env.MONGODB_URL)


app.get('/products',(req,res)=>{
        res.json(products);
    });

app.get('/products/:id',(req,res)=>{
        const product=  products.find(p=>p._id===req.params.id)
        res.json(product);
});



// app.use("/posts",postRouter)
// app.use("/users",userRouter)





app.get('/', (req,res)=>{
    res.send('Server is ready')
});

app.get((err,req,res,next)=>{
    res.satus(500).send({message:err.message}) 
})

const port= process.env.PORT||3000;

app.listen(port, ()=>{
    console.log(`Server at http://localhost:${port}`)
    
})

