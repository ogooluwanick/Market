import { ADMIN_USER_UPDATE_FAIL, ADMIN_USER_UPDATE_REQUEST, ADMIN_USER_UPDATE_RESET, ADMIN_USER_UPDATE_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_RESET, USER_LIST_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS } from "../constants/constants";

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
export const adminListReducer=(state={users: [] },action)=>{
        switch (action.type){
                case   USER_LIST_REQUEST :
                        return {loading:true} 
                case   USER_LIST_SUCCESS:
                        return {loading:false, users:action.payload}
                case   USER_LIST_FAIL:
                        return {loading:false,error:action.payload}
                case   USER_LIST_RESET:
                                return {users: [],loading:false}
                default:
                        return state;

        }
}

export const adminDeleteUserReducer=(state={ },action)=>{
        switch (action.type){
                case   DELETE_USER_REQUEST :
                        return {loading:true} 
                case   DELETE_USER_SUCCESS:
                        return {loading:false, success:true}
                case   DELETE_USER_FAIL:
                        return {loading:false,error:action.payload}
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
export const adminUpdateUserReducer=(state={user: {} },action)=>{
        switch (action.type){
                case   ADMIN_USER_UPDATE_REQUEST :
                        return {...state,loading:true} 
                case   ADMIN_USER_UPDATE_SUCCESS:
                        return {loading:false, success:true}
                case   ADMIN_USER_UPDATE_FAIL:
                        return {loading:false,error:action.payload}
                case   ADMIN_USER_UPDATE_RESET:
                        return {}
                default:
                        return state;

        }

}