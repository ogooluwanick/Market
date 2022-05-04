import axios from "axios";
import { CART_EMPTY, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/constants";


const baseURL="http://localhost:3005"

export const createOrder=(order)=>async(dispatch,getState)=>{
        dispatch({type:ORDER_CREATE_REQUEST})
        const {userSignin:{userInfo}}=getState();

        try{
                const config= {headers:{Authorization:`Bearer ${userInfo.token}`}}      

                const {data} = await axios.post(`${baseURL}/orders/`,order,config)  
                dispatch({type: ORDER_CREATE_SUCCESS, payload: data});
                dispatch({type: CART_EMPTY});
                localStorage.removeItem('cartItems')
           }
            catch(error){
                dispatch({type:ORDER_CREATE_FAIL,
                        payload: error.response && error.response.data?.message 
                        ? error.response.data?.message 
                        : error?.message, 
                })
            }
}

export const byIddetailsOrder=(id)=>async(dispatch,getState)=>{
        dispatch({type:ORDER_DETAILS_REQUEST})
        const {userSignin:{userInfo}}=getState();

        try{
                const config= {headers:{Authorization:`Bearer ${userInfo.token}`}}      

                const {data} = await axios.get(`${baseURL}/orders/${id}`,config)  
                dispatch({type: ORDER_DETAILS_SUCCESS, payload: data});
           }
            catch(error){
                dispatch({type:ORDER_DETAILS_FAIL,
                        payload: error.response && error.response.data?.message 
                        ? error.response.data?.message 
                        : error?.message, 
                })
            }
}