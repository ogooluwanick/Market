import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/constants";

const baseURL="http://localhost:3005/products"

export const addToCart=(id,qty)=>async(dispatch,getState)=>{
        console.log("data")
        const {data}= await axios.get(`${baseURL}/${id}`)
       
        dispatch({type:CART_ADD_ITEM, payload:{
                product:data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock:data.countInStock,
                qty,
        }})

        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))

}

export const removeFromCart=(id)=>async(dispatch,getState)=>{
        dispatch({type:CART_REMOVE_ITEM, payload:id})

        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))

}