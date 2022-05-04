import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Col, Image, ListGroup, Row} from 'react-bootstrap'

import "./PlaceOrder.scss"
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps'
import { useEffect } from 'react'
import MessageBox from '../../components/messagebox/MessageBox'
import { createOrder } from '../../actions/orderActions'


const PlaceOrder = () => {
        const cart= useSelector(state=>state.cart)
        const {success,order,error}= useSelector(state=>state.orderCreate)

        const nav=useNavigate()
        const dispatch= useDispatch()
        
        const addDec= (num)=>{
                return (Math.round(num*100)  /  100).toFixed(2)
        }

        cart.itemsPrice= addDec(cart.cartItems.reduce((acc,item)=>acc +item.price*item.qty,0))          //items cost
        cart.shippingPrice= addDec(cart.itemsPrice<10000 ?0: 2000)                                                      //shipping cost && twick later
        cart.taxPrice= addDec(Number((0.15 * cart.itemsPrice).toFixed(2)))                                              //tax cost

        cart.totalPrice=(Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice) ).toFixed(2)        //total cost


        const placeOrderHandler=()=>{
                dispatch(createOrder({
                        orderItems:cart.cartItems,
                        shippingAddress:cart.shippingAddress,
                        paymentMethod:cart.paymentMethod,
                        itemsPrice:cart.itemsPrice,
                        taxPrice:cart.taxPrice,
                        shippingPrice:cart.shippingPrice,
                        totalPrice:cart.totalPrice
                }))

        }
       

        useEffect(() => {
                if (!cart.paymentMethod){
                        nav("/payment")
                }

                if(success){
                        nav(`/order/${order?._id}`)
                }
        }, [cart,nav,success,order])
        

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
                                        <div>
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
                                                                                                        {item.qty} x ₦{(item.price).toFixed(2)}= ₦{(item.qty * item.price).toFixed(2) }
                                                                                                </Col>
                                                                                        </Row>

                                                                                </ListGroup.Item>
                                                                        ))}
                                                                </ListGroup>
                                                        )
                                                }
                                        </div>
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
                                                        {
                                                                error && <MessageBox variant='danger'>{error}</MessageBox>
                                                        }
                                                </ListGroup.Item>

                                                <ListGroup.Item>
                                                        <Row>
                                                                <Button type="button" className='btn-block app__flex checkoutBtn' disabled={cart.cartItems.length===0}  onClick={placeOrderHandler}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.536 7.555c-1.188-.252-4.606-.904-5.536-1.088v-3.512c0-1.629-1.346-2.955-3-2.955s-3 1.326-3 2.955v7.457c-.554-.336-1.188-.621-1.838-.715-1.822-.262-3.162.94-3.162 2.498 0 .805.363 1.613 1.022 2.271 3.972 3.972 5.688 5.125 6.059 9.534h9.919v-1.748c0-5.154 3-6.031 3-10.029 0-2.448-1.061-4.157-3.464-4.668zm.357 8.022c-.821 1.483-1.838 3.319-1.891 6.423h-6.13c-.726-3.82-3.81-6.318-6.436-8.949-.688-.686-.393-1.37.442-1.373 1.263-.006 3.06 1.884 4.122 3.205v-11.928c0-.517.458-.955 1-.955s1 .438 1 .955v6.948c0 .315.256.571.572.571.314 0 .57-.256.57-.571v-.575c0-.534.49-.938 1.014-.833.398.079.686.428.686.833v1.273c0 .315.256.571.571.571s.571-.256.571-.571v-.83c0-.531.487-.932 1.008-.828.396.078.682.424.682.828v1.533c0 .315.256.571.571.571s.571-.256.571-.571v-.912c0-.523.545-.867 1.018-.646.645.305 1.166.932 1.166 2.477 0 1.355-.465 2.193-1.107 3.354z"/></svg>
                                                                        <span className='mx-1'>Place Order</span> 
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