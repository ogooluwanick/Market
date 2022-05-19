import {applyMiddleware, compose, createStore,combineReducers} from "redux";
import thunk from "redux-thunk";

import { adminCreateProductReducer, adminDeleteProductReducer, adminUpdateProductReducer, productDetailsReducer, productListReducer } from "./reducers/productReducers";
import {cartReducers } from "./reducers/cartReducers";
import { adminDeleteUserReducer, adminListReducer, adminUpdateUserReducer, userDetailsReducer, userSigninReducer, userSignupReducer, userUpdateProfileReducer } from "./reducers/userReducers";
import { adminOrderListReducer, orderCreateReducer, orderDeliverReducer, orderDetailsReducer, ordermyListReducer, orderPayReducer } from "./reducers/orderReducers";



const initialState= {
        userSignin:{
                userInfo:localStorage.getItem("userInfo")?
                JSON.parse(localStorage.getItem("userInfo")):
                null,
        },
        cart:{
                cartItems:localStorage.getItem("cartItems")?
                JSON.parse(localStorage.getItem("cartItems")):
                [],
                shippingAddress:localStorage.getItem('shippingAddress') ?
                JSON.parse(localStorage.getItem('shippingAddress')):
                {},

        }
}

const reducer= combineReducers({
        productList:productListReducer,
        productDetails:productDetailsReducer,
        cart:cartReducers,
        userSignin:userSigninReducer,
        userSignup:userSignupReducer,
        userDetails:userDetailsReducer,
        userUpdateProfile:userUpdateProfileReducer,
        orderCreate:orderCreateReducer,
        orderDetails:orderDetailsReducer,
        orderPay:orderPayReducer,
        orderDeliver:orderDeliverReducer,
        orderMyList:ordermyListReducer,
        adminUserList:adminListReducer,
        adminUserDelete:adminDeleteUserReducer,
        adminUserUpdate:adminUpdateUserReducer,
        adminProductDelete:adminDeleteProductReducer,
        adminProductCreate:adminCreateProductReducer,
        adminProductUpdate:adminUpdateProductReducer,
        adminOrderList :adminOrderListReducer,


})


const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
        reducer, 
        initialState, 
        composeEnhancer(applyMiddleware(thunk))
    );


    export default store;