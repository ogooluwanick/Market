import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS } from "../constants/constants";

export const userSigninReducer=(state={},action)=>{
        switch (action.type){
                case   USER_SIGNIN_REQUEST :
                        return {loading:true} 
                case   USER_SIGNIN_SUCCESS :
                        return {loading:false, userInfo:action.payload}
                case   USER_SIGNIN_FAIL :
                        return {loading:false,error:action.payload}
                case USER_SIGNOUT:
                        return  {}
                default:
                        return state;

        }

}

export const userSignupReducer=(state={},action)=>{
        switch (action.type){
                case   USER_REGISTER_REQUEST :
                        return {loading:true} 
                case   USER_REGISTER_SUCCESS :
                        return {loading:false, userInfo:action.payload}
                case   USER_REGISTER_FAIL :
                        return {loading:false,error:action.payload}
                default:
                        return state;

        }

}
export const userDetailsReducer=(state={user: {} },action)=>{
        switch (action.type){
                case   USER_DETAILS_REQUEST :
                        return {...state,loading:true} 
                case   USER_DETAILS_SUCCESS :
                        return {loading:false, user:action.payload}
                case   USER_DETAILS_FAIL:
                        return {loading:false,error:action.payload}
                case   USER_DETAILS_RESET:
                        return {}
                default:
                        return state;

        }

}

export const userUpdateProfileReducer=(state={user: {} },action)=>{
        switch (action.type){
                case   USER_UPDATE_REQUEST :
                        return {...state,loading:true} 
                case   USER_UPDATE_SUCCESS :
                        return {loading:false, success:true,userInfo:action.payload}
                case   USER_UPDATE_FAIL:
                        return {loading:false,error:action.payload}
                case   USER_UPDATE_RESET:
                        return {}
                default:
                        return state;

        }

}