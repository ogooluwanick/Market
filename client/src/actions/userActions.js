import  axios  from "axios";
import { ADMIN_USER_UPDATE_FAIL, ADMIN_USER_UPDATE_REQUEST, ADMIN_USER_UPDATE_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, ORDER_MY_LIST_REQUEST, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_RESET, USER_LIST_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/constants";

const baseURL="marketapphog.herokuapp.com/api"

export const signinUsers=(formData,nav, redirect)=>async(dispatch)=>{
        dispatch({type:USER_SIGNIN_REQUEST})
        try {
            const config= {headers:{"Content-Type":"application/json"}}      

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
                const config= {headers:{"Content-Type":"application/json"}}      

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
export const detailsUsers=(id)=> async(dispatch,getState)=>{
        dispatch({type:USER_DETAILS_REQUEST})
        const {userSignin:{userInfo}}=getState();

        try{
                const config= {
                        headers:{Authorization:`Bearer ${userInfo.token}`}
                }      

                const {data} = await axios.get(`${baseURL}/users/${id}`,config)  
                dispatch({type: USER_DETAILS_SUCCESS, payload: data});
        }
        catch(error){
        dispatch({type:USER_DETAILS_FAIL,
                payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message, 
        })
        }
}
export const adminListUsers=()=> async(dispatch,getState)=>{
        dispatch({type:USER_LIST_REQUEST})
        const {userSignin:{userInfo}}=getState();

        try{
                const config= {
                        headers:{Authorization:`Bearer ${userInfo.token}`}
                }      

                const {data} = await axios.get(`${baseURL}/users/listusers`,config)  
                dispatch({type: USER_LIST_SUCCESS, payload: data});
        }
        catch(error){
        dispatch({type:USER_LIST_FAIL,
                payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message, 
        })
        }
}

export const adminDeleteUser=(id)=> async(dispatch,getState)=>{
        dispatch({type:DELETE_USER_REQUEST})
        const {userSignin:{userInfo}}=getState();

        try{
                const config= {
                        headers:{Authorization:`Bearer ${userInfo.token}`}
                }      

                const {data} = await axios.delete(`${baseURL}/users/${id}`,config)  
                dispatch({type: DELETE_USER_SUCCESS});
                dispatch({type: USER_DETAILS_SUCCESS, payload: data});
        }
        catch(error){
        dispatch({type:DELETE_USER_FAIL,
                payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message, 
        })
        }
}

export const adminUpdateProfileUsers=(user,id)=> async(dispatch,getState)=>{
        dispatch({type:ADMIN_USER_UPDATE_REQUEST})
        const {userSignin:{userInfo}}=getState();

        try{
                const config= {
                        headers:{Authorization:`Bearer ${userInfo.token}`}
                }      

                const {data} = await axios.put(`${baseURL}/users/updateuser/${id}`,user,config)  
                dispatch({type: ADMIN_USER_UPDATE_SUCCESS, payload: data});
        }
        catch(error){
        dispatch({type:ADMIN_USER_UPDATE_FAIL,
                payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message, 
        })
        }
}

export const updateProfileUsers=(user)=> async(dispatch,getState)=>{
        dispatch({type:USER_UPDATE_REQUEST})
        const {userSignin:{userInfo}}=getState();

        try{
                const config= {
                        headers:{Authorization:`Bearer ${userInfo.token}`}
                }      

                const {data} = await axios.put(`${baseURL}/users/updateprofile`,user,config)  
                dispatch({type: USER_UPDATE_SUCCESS, payload: data});
                dispatch({type:USER_SIGNIN_SUCCESS, payload: data})

                localStorage.setItem("userInfo",JSON.stringify( data))
        }
        catch(error){
        dispatch({type:USER_UPDATE_SUCCESS,
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
        dispatch({type:USER_DETAILS_RESET})
        dispatch({type:ORDER_MY_LIST_REQUEST})
        dispatch({type:USER_LIST_RESET})


}