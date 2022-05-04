import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {Card, Col, Image, ListGroup, Row} from 'react-bootstrap'

import "./OrderDetailsPage.scss"
import { useEffect } from 'react'
import MessageBox from '../../components/messagebox/MessageBox'
import LoadingBox from '../../components/loadingbox/LoadingBox'

import { byIddetailsOrder } from '../../actions/orderActions'


const OrderDetailsPage = () => {
        const {loading,order,error}= useSelector(state=>state.orderDetails)

        const nav=useNavigate()
        const {id}= useParams()
        const dispatch= useDispatch()

        const addDec= (num)=>{
                return (Math.round(num*100)  /  100).toFixed(2)
        }
        
        if(!loading && !error) {  order.itemsPrice= addDec(order?.orderItems.reduce((acc,item)=>acc +item.price*item.qty,0))  }   

        useEffect(() => {
                if(!order || order._id !== id) {
                dispatch(byIddetailsOrder(id))
                }
        }, [dispatch,id,order])
        

  return loading? <div className="my-3"><LoadingBox></LoadingBox></div> :
                error?<div className="my-3"><MessageBox className="my-2" variant="danger">{error}</MessageBox></div> :
                (
                        <div className="my-3">
                                <h1>Order: {order._id}</h1>
                                <Row>
                                        <Col md={8} className="mb-3">
                                                <ListGroup.Item>
                                                        <h2>Shipping</h2>
                                                        <p><strong>Name: </strong>{order.user.name}</p>
                                                        <p><strong>Email: </strong> <a href={`mailto: ${order.user.email}`}>{order.user.email}</a></p>
                                                        <p>
                                                                <strong>Address: </strong>
                                                                {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postcode}, {order.shippingAddress?.country}
                                                        </p>
                                                        {       order.isDelivered?<MessageBox variant="success">Delivered on: {order.DeliveredAt}</MessageBox>:
                                                                (
                                                                        <MessageBox variant="danger">Not Delivered</MessageBox>
                                                                )
                                                        }
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                        <h2>Payment Method</h2>
                                                        <p>
                                                                <strong>Modthod: </strong>
                                                                {order?.paymentMethod}
                                                        </p>
                                                        {       order.isPaid?<MessageBox variant="success">Paid on: {order.PaidAt}</MessageBox>:
                                                                (
                                                                        <MessageBox variant="danger">Not Paid</MessageBox>
                                                                )
                                                        }
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                        <h2>Order items</h2>
                                                        <div>
                                                                {order?.orderItems.length===0?
                                                                        <MessageBox>Order is empty, <Link to="/">Go Back</Link>.</MessageBox>
                                                                        :
                                                                        (
                                                                                <ListGroup variant='flush' >
                                                                                        {  order.orderItems.map((item,index)=>(
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
                                                                                <Col>₦{order.itemsPrice}</Col>
                                                                        </Row>
                                                                </ListGroup.Item>
                                                                <ListGroup.Item>
                                                                        <Row>
                                                                                <Col>Shipping</Col>
                                                                                <Col>₦{order.shippingPrice}</Col>
                                                                        </Row>
                                                                </ListGroup.Item>
                                                                <ListGroup.Item>
                                                                        <Row>
                                                                                <Col>Tax</Col>
                                                                                <Col>₦{order.taxPrice}</Col>
                                                                        </Row>
                                                                </ListGroup.Item>
                                                                <ListGroup.Item>
                                                                        <Row>
                                                                                <Col>Total</Col>
                                                                                <Col>₦{order.totalPrice}</Col>
                                                                        </Row>
                                                                </ListGroup.Item>
                                                        </ListGroup>
                                                </Card>
                                        </Col>
                                </Row>
                        
                        </div>
                )
}

export default OrderDetailsPage