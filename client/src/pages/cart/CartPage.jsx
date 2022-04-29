import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import {Row,Col,Image,Form,ListGroup,Button,Card} from "react-bootstrap"

import MessageBox from '../../components/messagebox/MessageBox'
import "./CartPage.scss"
import { addToCart } from '../../actions/cartActions'
import { removeFromCart } from '../../actions/cartActions'


const CartPage = () => {
        const location = useLocation()
        const dispatch= useDispatch()
        const nav=useNavigate()
        
        const {id:productID} = useParams()
       const {cartItems}= useSelector(state=>state.cart)

        const qty = Number(new URLSearchParams(location.search).get("qty"))                     //get qty from url
                ? Number(new URLSearchParams(location.search).get("qty"))
                : 1;

        const removeFromCartHandler=(id)=>{
                dispatch(removeFromCart(id))
                nav("/cart")
        }

        const checkoutHandler=()=>{
                nav("/login?redirect=shipping")
        }

        useEffect(() => {
                if(productID){
                        dispatch(addToCart(productID,qty))
                }
        }, [dispatch,productID,qty])
        
  return (
    <div>
            <Row  >
                    <Col md={8}>
                            <h1>Shopping Cart</h1>
                                {
                                        cartItems.length===0? 
                                        <MessageBox>Cart is empty <Link to="/">Go Back</Link></MessageBox>
                                        :
                                        (
                                                <ListGroup variant="flush">
                                                        {cartItems.map((item)=>(
                                                                <ListGroup.Item key={item.product}>
                                                                        <Row>
                                                                                <Col md={2}>
                                                                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                                                                </Col>
                                                                                <Col md={3}>
                                                                                        <Link to={`/products/${productID}`} >{item.name}</Link>
                                                                                </Col>
                                                                                <Col md={2}>
                                                                                        ₦{item.price}
                                                                                </Col>
                                                                                <Col md={2}>
                                                                                                        <Form.Control className="" as="select"  value={item.qty} onChange={(e) =>{dispatch( addToCart(item.product ,Number(e.target.value)))}}> 
                                                                                                               { 
                                                                                                                        [...Array(item.countInStock).keys()].map((item)=>(
                                                                                                                                <option key={item+1} value={item+1}>{item+1}  </option>
                                                                                                                                ))
                                                                                                                }
                                                                                                       </Form.Control>
                                                                                </Col>
                                                                                <Col md={2}>
                                                                                        <Button type="button" variant="light" onClick={()=>{removeFromCartHandler(item.product)}}><i  className="fa-solid fa-trash-can"/></Button>
                                                                                </Col>
                                                                        </Row>
                                                                </ListGroup.Item>
                                                        ))}
                                                </ListGroup>
                                        ) 

                                } 
                    </Col>
                    <Col md={4}>
                            <Card className="cartDataBox">
                                    <ListGroup variant="flush" className="app__flex ">
                                             <ListGroup.Item >                                                                                                                          
                                                    <h4>Sub-total ({cartItems.reduce((acc,item)=>acc+item.qty,0)}) items</h4>                            {/* counts  value with reduce func*/}
                                                    ₦{ cartItems.reduce((acc,item)=>acc+item.qty *item.price,0).toFixed(2)}
                                            </ListGroup.Item>
                                            <ListGroup.Item >                                                                                                                          
                                                <Button type="button" className="btn-block checkoutBtn"  disabled={cartItems.length===0} onClick={checkoutHandler}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.029 13h2.971l-.266 1h-2.992l.287-1zm.863-3h2.812l.296-1h-2.821l-.287 1zm-.576 2h4.387l.297-1h-4.396l-.288 1zm-11.816 6c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm8-16.5l-.743 2h-1.929l-3.474 12h-11.239l-4.615-11h14.812l-2.541 9h2.102l3.432-12h4.195z"/></svg> 
                                                        <span>  Checkout</span>    
                                                </Button>
                                            </ListGroup.Item>

                                    </ListGroup>
                            </Card>
                    </Col>

            </Row>
    </div>
  )
}

export default CartPage