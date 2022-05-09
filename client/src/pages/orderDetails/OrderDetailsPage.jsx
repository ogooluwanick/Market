import React ,{useState,useEffect}from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {Card, Col, Image, ListGroup, Row} from 'react-bootstrap'
import { PayPalButton } from "react-paypal-button-v2";
import { PaystackButton } from 'react-paystack';
import moment from "moment"



import "./OrderDetailsPage.scss"
import MessageBox from '../../components/messagebox/MessageBox'
import LoadingBox from '../../components/loadingbox/LoadingBox'
import { byIddetailsOrder, payOrder } from '../../actions/orderActions'
import { ORDER_PAY_RESET } from '../../constants/constants'


const OrderDetailsPage = () => {
        const [sdkReady, setSdkReady] = useState(false)

        const {userInfo}= useSelector(state=>state.userSignin)
        const {loading,order,error}= useSelector(state=>state.orderDetails)
        const {success:successPay,loading:loadingPay}= useSelector(state=>state.orderPay)


        const nav=useNavigate()
        const {id}= useParams()
        const dispatch= useDispatch()

        const addDec= (num)=>{
                return (Math.round(num*100)  /  100).toFixed(2)
        }
        
        if(!loading && !error) {  order.itemsPrice= addDec(order?.orderItems.reduce((acc,item)=>acc +item.price*item.qty,0))  }   

        
        const payPalSuccessHandler=(paymentResult)=>{
                dispatch(payOrder(id,paymentResult))
        }

        const paystackSuccessHandler = (paymentResult) => {
                // Implementation for whatever you want to do with reference and after success call.
                console.log(paymentResult);
                dispatch(payOrder(id,paymentResult))

              };

        const paystackOnCloseHandler = () => {
                // implementation for  whatever you want to do when the Paystack dialog closed.
                console.log('closed')
              }
            
        const paystackConfig = {
                reference: (new Date()).getTime().toString(),
                email: order?.user?.email,
                publicKey: 'pk_test_938967b82e1bed29a14943b7cf1b10004bdd0e01',
                amount: (order?.totalPrice.toFixed(0) *100),

        };

        const paymentViewFunc=(paymentcode)=> {
                switch(paymentcode) {
                        case 'Paypal':
                                                if (!sdkReady){
                                                       return  <LoadingBox/>
                                                }
                                                else{
                                                       return <PayPalButton amount={order.totalPrice} onSuccess={payPalSuccessHandler}/>
                                                }
                                        
                        case 'Transfers':
                                return (
                                                        <div className="orderDetailsTransferDeets">
                                                                <div><stron>Acct Name:</stron>Market acct number </div>
                                                                <div><stron>Acct Number:</stron>1324213243 </div>
                                                                <div><stron>Bank:</stron>Key Bank </div>
                                                        </div>
                                        );
                        case 'Paystack':
                                return (
                                                        <PaystackButton   text= {
                                                                                        <div >
                                                                                                <svg width="29" height="28" viewBox="0 0 29 28" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.51165 0H25.7369C26.5715 0 27.2504 0.671185 27.2504 1.50214V4.16909C27.2504 4.99651 26.5716 5.67141 25.7369 5.67141H1.51165C0.676996 5.67141 0 4.99657 0 4.16909V1.50214C0 0.671185 0.676996 0 1.51165 0ZM1.51165 14.887H25.7369C26.5715 14.887 27.2504 15.5599 27.2504 16.3874V19.058C27.2504 19.8854 26.5716 20.5566 25.7369 20.5566H1.51165C0.676996 20.5566 0 19.8854 0 19.058V16.3874C0 15.5599 0.676996 14.887 1.51165 14.887ZM15.1376 22.3304H1.51165C0.676996 22.3304 0 23.0016 0 23.8309V26.4997C0 27.3272 0.676996 28 1.51165 28H15.1377C15.9759 28 16.6511 27.3272 16.6511 26.4997V23.8309C16.6511 23.0016 15.9759 22.3304 15.1376 22.3304ZM1.51165 7.44171H27.2504C28.0868 7.44171 28.7619 8.11469 28.7619 8.94379V11.6127C28.7619 12.4401 28.0868 13.1148 27.2504 13.1148H1.51165C0.676996 13.1148 0 12.4401 0 11.6127V8.94379C0 8.11469 0.676996 7.44171 1.51165 7.44171Z" fill="#09A5DB"></path></svg>                                                                                
                                                                                                <span>Paystack</span>
                                                                                        </div>
                                                                                } 
                                                                                        className='btn btn-primary checkoutBtn payStackPayBtn rounded'
                                                                                       {...paystackConfig}
                                                                                        onSuccess={(reference)=>paystackSuccessHandler(reference)}   
                                                                                        onClose= {paystackOnCloseHandler} 
                                                        />
                                    );
                  default:
                    return <></>;
                }
              }
              



        useEffect(() => {
                if (!userInfo) {
                        nav('/login')
                }

                const addPayPalScript= async()=>{
                        const {data: clientID} =await axios.get("http://localhost:3005/api/3rdPartyPayment/paypal")
                        const script= document.createElement("script")
                        script.type="text/javascript"
                        script.src=`https://www.paypal.com/sdk/js?client-id=${clientID}`
                        script.async=true
                        script.onload=()=>{
                                setSdkReady(true)
                        }
                        document.body.appendChild(script)
                }


                if(!order || successPay /* || successDeliver*/  || order._id !== id) {
                        dispatch({ type: ORDER_PAY_RESET })
                        dispatch(byIddetailsOrder(id))
                }
                else if(!order.isPaid){
                        if(!window.paypal){
                                addPayPalScript()
                        }
                        else{
                                setSdkReady(true)
                        }
                }
        }, [dispatch,id,order,successPay,userInfo,nav])
        

  return loading? <div className="my-3"><LoadingBox></LoadingBox></div> :
                error?<div className="my-3"><MessageBox className="my-2" variant="danger">{error}</MessageBox></div> :
                (
                        <div className="my-3">
                                <h1 style={{fontSize:"1.1rem",fontWeight:"550"}}>Order: {order._id}</h1>
                                <Row>
                                        <Col md={8} className="mb-3">
                                                <ListGroup.Item>
                                                        <h2>Shipping</h2>
                                                        <p><strong>Name: </strong>{order.user.name}</p>
                                                        <p><strong>Email: </strong> <a href={`mailto: ${order.user.email}`}>{order.user.email}</a></p>
                                                        <p><strong>Phone: </strong> <a href={`tel: ${order?.user?.phone}`}>{order?.user?.phone}</a></p>
                                                        <p>
                                                                <strong>Address: </strong>
                                                                {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.state}, {order.shippingAddress?.country}
                                                        </p>
                                                        {       order.isDelivered?<MessageBox variant="success">Delivered on: {`${moment(order.DeliveredAt).format('Do [of] MMMM, YYYY [at] h:mma')} `}</MessageBox>:
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
                                                        {       order.isPaid?<MessageBox variant="success">Paid on: {`${moment(order.paidAt).format('Do [of] MMMM, YYYY [at] h:mma')}`}</MessageBox>:
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
                                                                {
                                                                        !order.isPaid&&(
                                                                                <ListGroup.Item>
                                                                                        {loadingPay ?<LoadingBox/>
                                                                                                :(
                                                                                                        paymentViewFunc(order.paymentMethod)
                                                                                                )
                                                                                        }
                                                                                </ListGroup.Item>
                                                                        )
                                                                }
                                                        </ListGroup>
                                                </Card>
                                        </Col>
                                </Row>
                        
                        </div>
                )
}

export default OrderDetailsPage