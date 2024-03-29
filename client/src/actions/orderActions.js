import axios from "axios";
import { CART_EMPTY, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_MY_LIST_FAIL, ORDER_MY_LIST_REQUEST, ORDER_MY_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/constants";

export const createOrder=(order)=>async(dispatch,getState)=>{
        dispatch({type:ORDER_CREATE_REQUEST})
        const {userSignin:{userInfo}}=getState();

        try{
                const config= {headers:{Authorization:`Bearer ${userInfo.token}`}}      

                const {data} = await axios.post(`/api/orders/`,order,config)  
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

                const {data} = await axios.get(`/api/orders/${id}`,config)  
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

                const {data} = await axios.put(`/api/orders/${orderId}/pay`,paymentResult,config)  
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
export const deliverOrder=(orderId)=>async(dispatch,getState)=>{
        dispatch({type:ORDER_DELIVER_REQUEST})
        const {userSignin:{userInfo}}=getState();
        

        try{
                const config= {headers:{Authorization:`Bearer ${userInfo.token}`}}      
                
                const {data} = await axios.put(`/api/orders/${orderId}/deliver`,{},config)  
                dispatch({type: ORDER_DETAILS_SUCCESS, payload: data});
           }
            catch(error){
                dispatch({type:ORDER_DELIVER_FAIL,
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

                const {data} = await axios.get(`/api/orders/myorders`,config)  
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
export const displayAllOrders=()=>async(dispatch,getState)=>{
        dispatch({type:ORDER_LIST_REQUEST})
        const {userSignin:{userInfo}}=getState();
        

        try{
                const config= {headers:{Authorization:`Bearer ${userInfo.token}`}}      

                const {data} = await axios.get(`/api/orders/allorders`,config)  
                dispatch({type: ORDER_LIST_SUCCESS, payload: data});
           }
            catch(error){
                dispatch({type:ORDER_LIST_FAIL,
                        payload: error.response && error.response.data?.message 
                        ? error.response.data?.message 
                        : error?.message, 
                })
            }
}