import  axios  from "axios";
import { DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/constants";

const baseURL="http://localhost:3005"

export const listProducts =()=> async(dispatch) =>{
        dispatch({type:PRODUCT_LIST_REQUEST})

        try {
                const {data}= await axios.get(`${baseURL}/products`)
                dispatch({type:PRODUCT_LIST_SUCCESS, payload: data})
        } catch (error) {
                dispatch({
                        type:PRODUCT_LIST_FAIL, 
                        payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,})
                
        }
        
}

export const detailsProduct =(productsID)=> async (dispatch) => { 
        dispatch({
            type: PRODUCT_DETAILS_REQUEST, payload: productsID
        });
    
        try{
            const {data} = await axios.get(`${baseURL}/products/${productsID}`);
            dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
        }
        catch(error){
            dispatch({
                type: PRODUCT_DETAILS_FAIL,
                payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message, 
          })
        }
    }
export const adminDeleteProduct =(productsID)=> async (dispatch,getState) => { 
        dispatch({type: DELETE_PRODUCT_REQUEST});
        const {userSignin:{userInfo}}=getState();
    
        try{
                const config= {headers:{Authorization:`Bearer ${userInfo.token}`}}      

             await axios.delete(`${baseURL}/products/${productsID}`,config);
            dispatch({type: DELETE_PRODUCT_SUCCESS});
        }
        catch(error){
            dispatch({
                type: DELETE_PRODUCT_FAIL,
                payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message, 
          })
        }
    }