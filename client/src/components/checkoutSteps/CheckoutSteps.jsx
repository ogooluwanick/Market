import React from "react"
import { Link } from "react-router-dom"
import "./CheckoutSteps.scss"



export default function CheckoutSteps(props) { 
    return (
        <div className="checkout-steps">
                <div className={props.step1? 'active':" "}>  
                        <Link className="checkoutLinks app__rm-textDecor" to="/login">Signin</Link>
                </div>
                <div className={props.step2? 'active':" "}>  
                        <Link className="checkoutLinks app__rm-textDecor" to="/shipping">Shipping</Link>
                </div>
                <div className={props.step3? 'active':" "}>  
                        <Link className="checkoutLinks app__rm-textDecor" to="/payment">Payment</Link>
                </div>
                <div className={props.step4? 'active':""}>     
                        <Link className="checkoutLinks app__rm-textDecor" to="/placeorder">Place Order</Link>
                </div>
        </div>
    )
}

