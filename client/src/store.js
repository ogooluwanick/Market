import {applyMiddleware, compose, createStore,combineReducers} from "redux";
import thunk from "redux-thunk";
import { productDetailsReducer, productListReducer } from "./reducers/productReducers";
import {cartReducers } from "./reducers/cartReducers";



const initialState= {
        cart:{
                cartItems:localStorage.getItem("cartItems")?
                JSON.parse(localStorage.getItem("cartItems")):
                [],
        }
}

const reducer= combineReducers({
        productList:productListReducer,
        productDetails:productDetailsReducer,
        cart:cartReducers,


})


const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
        reducer, 
        initialState, 
        composeEnhancer(applyMiddleware(thunk))
    );


    export default store;