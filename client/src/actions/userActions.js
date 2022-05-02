import  axios  from "axios";
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/constants";

const baseURL="http://localhost:3005"

export const signinUsers=(formData,nav, redirect)=>async(dispatch)=>{
        dispatch({type:USER_SIGNIN_REQUEST})
        try {
                const config= {
                        headers:{"Content-Type":"application/json"}
                }      
            const {data} = await axios.post(`${baseURL}/users/login`,formData,config) 
            dispatch({type:USER_SIGNIN_SUCCESS, payload: data})

             localStorage.setItem("userInfo",JSON.stringify(data))


                nav(`/${redirect}`)
                
        } catch (error) {
                dispatch({type:USER_SIGNIN_FAIL,
                        payload: error.response && error.response.data.message 
                        ? error.response.data.message 
                        : error.message, 
                })
        }
}


export const signupUsers=(formData,nav, redirect)=> async(dispatch)=>{
        dispatch({type:USER_REGISTER_REQUEST})
        try{
                const config= {
                        headers:{"Content-Type":"application/json"}
                }      

                const {data} = await axios.post(`${baseURL}/users/register`,formData,config)  
                dispatch({type: USER_REGISTER_SUCCESS, payload: data});
                dispatch({type:USER_SIGNIN_SUCCESS, payload: data})
        
                localStorage.setItem("userInfo",JSON.stringify(data))
                nav(`/${redirect}`)
            }
            catch(error){
                dispatch({type:USER_SIGNIN_FAIL,
                        payload: error.response && error.response.data.message 
                        ? error.response.data.message 
                        : error.message, 
                })
            }
}


export const signoutUsers=(nav)=>async(dispatch)=>{
        localStorage.clear()
        nav("/")
        dispatch({type:USER_SIGNOUT})


}