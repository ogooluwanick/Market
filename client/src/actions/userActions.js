import  axios  from "axios";
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../constants/constants";

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
        // try{
        //         const {data} = await 
        //         dispatch({type: AUTH, payload: data});
        
                
        //         nav(`/${redirect}`)
        //     }
        //     catch(error){
        //         console.log(error)
        //     }
}
