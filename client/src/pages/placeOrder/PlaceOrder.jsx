import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Col, Form, Image, ListGroup, Row} from 'react-bootstrap'

import "./PlaceOrder.scss"
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps'
import { useEffect } from 'react'
import MessageBox from '../../components/messagebox/MessageBox'


const PlaceOrder = () => {
        const cart= useSelector(state=>state.cart)

        const nav=useNavigate()
        
        const addDec= (num)=>{
                return (Math.round(num*100)  /  100).toFixed(2)
        }

        cart.itemsPrice= addDec(cart.cartItems.reduce((acc,item)=>acc +item.price*item.qty,0))          //items cost
        cart.shippingPrice= addDec(cart.itemsPrice<10000 ?0: 2000)                                                      //shipping cost && twick later
        cart.taxPrice= addDec(Number((0.15 * cart.itemsPrice).toFixed(2)))                                              //tax cost

        cart.totalPrice=(Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice) ).toFixed(2)        //total cost


        const placeOrderHandler=()=>{

        }
       

        useEffect(() => {
                if (!cart.paymentMethod){
                        console.log("shippingAddress",cart.paymentMethod)
                        nav("/payment")
                }
        }, [cart,nav])
        

  return (
        <div>
                <CheckoutSteps step1 step2 step3 step4/>
                <Row>
                        <Col md={8} className="mb-3">
                                <ListGroup.Item>
                                        <h2>Shipping</h2>
                                        <p>
                                                <strong>Address: </strong>
                                                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postcode}, {cart.shippingAddress.country}
                                        </p>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                        <h2>Payment Method</h2>
                                        <p>
                                                <strong>Modthod: </strong>
                                                {cart?.paymentMethod}
                                        </p>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                        <h2>Order items</h2>
                                        <p>
                                                {cart?.cartItems.length===0?
                                                         <MessageBox>Your cart is empty, <Link to="/">Go Back</Link>.</MessageBox>
                                                        :
                                                        (
                                                                <ListGroup variant='flush' >
                                                                        {  cart.cartItems.map((item,index)=>(
                                                                                <ListGroup.Item  key={index}>
                                                                                        <Row className='app__flex'>
                                                                                                <Col md={2}>
                                                                                                        <Link className='app__rm-textDecor' to={`/products/${item.product}`}> <Image src={item.image} alt={item.name} fluid rounded/></Link>
                                                                                                </Col>
                                                                                                <Col >
                                                                                                        <Link className='app__rm-textDecor' to={`/products/${item.product}`}> {item.name}</Link>
                                                                                                </Col>
                                                                                                <Col md={4}>
                                                                                                        {item.qty} x ₦{item.price}= ₦{item.qty * item.price }
                                                                                                </Col>
                                                                                        </Row>

                                                                                </ListGroup.Item>
                                                                        ))}
                                                                </ListGroup>
                                                        )
                                                }
                                        </p>
                                </ListGroup.Item>
                        </Col>
                        <Col md={4}>
                                <Card>
                                        <ListGroup variant='flush'>
                                                <ListGroup.Item>
                                                        <h2>Order Summary</h2>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                        <Row>
                                                                <Col>Items</Col>
                                                                <Col>₦{cart.itemsPrice}</Col>
                                                        </Row>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                        <Row>
                                                                <Col>Shipping</Col>
                                                                <Col>₦{cart.shippingPrice}</Col>
                                                        </Row>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                        <Row>
                                                                <Col>Tax</Col>
                                                                <Col>₦{cart.taxPrice}</Col>
                                                        </Row>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                        <Row>
                                                                <Col>Total</Col>
                                                                <Col>₦{cart.totalPrice}</Col>
                                                        </Row>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                        <Row>
                                                                <Button type="button" className='btn-block' disabled={cart.cartItems.length===0}  onClick={placeOrderHandler}>
                                                                        Place Order
                                                                </Button>
                                                        </Row>
                                                </ListGroup.Item>
                                        </ListGroup>
                                </Card>
                        </Col>
                </Row>
        </div>
  )
}

export default PlaceOrder