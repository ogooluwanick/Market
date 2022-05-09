import axios from "axios";
import { CART_EMPTY, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_MY_LIST_FAIL, ORDER_MY_LIST_REQUEST, ORDER_MY_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/constants";


const baseURL="http://localhost:3005"

export const createOrder=(order)=>async(dispatch,getState)=>{
        dispatch({type:ORDER_CREATE_REQUEST})
        const {userSignin:{userInfo}}=getState();
        console.log("order",order)

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

export const payOrder=(orderId,paymentResult)=>async(dispatch,getState)=>{
        dispatch({type:ORDER_PAY_REQUEST})
        const {userSignin:{userInfo}}=getState();
        

        try{
                const config= {headers:{Authorization:`Bearer ${userInfo.token}`}}      

                const {data} = await axios.put(`${baseURL}/orders/${orderId}/pay`,paymentResult,config)  
                dispatch({type: ORDER_PAY_SUCCESS, payload: data});
           }
            catch(error){
                dispatch({type:ORDER_PAY_FAIL,
                        payload: error.response && error.response.data?.message 
                        ? error.response.data?.message 
                        : error?.message, 
                })
            }
}
export const displayMyOrders=()=>async(dispatch,getState)=>{
        dispatch({type:ORDER_MY_LIST_REQUEST})
        const {userSignin:{userInfo}}=getState();
        

        try{
                const config= {headers:{Authorization:`Bearer ${userInfo.token}`}}      

                const {data} = await axios.get(`${baseURL}/orders/myorders`,config)  
                dispatch({type: ORDER_MY_LIST_SUCCESS, payload: data});
           }
            catch(error){
                dispatch({type:ORDER_MY_LIST_FAIL,
                        payload: error.response && error.response.data?.message 
                        ? error.response.data?.message 
                        : error?.message, 
                })
            }
}