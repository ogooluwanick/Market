import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/constants";


export const cartReducers=(state={cartItems:[]},action)=>{
        switch (action.type) {
                case CART_ADD_ITEM:
                        const item =action.payload
                        const existItem= state.cartItems.find((x)=> x.product===item.product)

                        if (existItem){
                                return {...state,cartItems:state.cartItems.map((x)=> x.product===item.product?item:x)}
                        }
                        else{
                                return {...state,cartItems:[...state.cartItems,item]}
                        }
                case CART_REMOVE_ITEM:
                                return {...state,cartItems:state.cartItems.filter((x)=>x.product!==action.payload) }
                        
                // case CART_ADD_ITEM:
                //         return {loading:false, payload: }
                // case CART_ADD_ITEM:
                //         return {loading:false, payload: }
                default:
                        return state;
        }

}