import React,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Form} from 'react-bootstrap'


import "./PaymentMethod.scss"
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps'
import { savePaymentMethod } from '../../actions/cartActions'
import FormContainer from '../../components/formContainer/FormContainer'
import { useEffect } from 'react'



const PaymentMethod = () => {
        const {shippingAddress}= useSelector(state=>state.cart)
        
        const nav=useNavigate()
        const dispatch=useDispatch()  


        const [paymentMethod, setPaymentMethod] = useState("Paypal")
        
        

        const submithandler=(e)=>{
                e.preventDefault()
                dispatch(savePaymentMethod(paymentMethod))
                nav("/placeorder")
        }
        
        useEffect(() => {
                if (!shippingAddress.address || !shippingAddress.city){
                        nav("/shipping")
                }
        }, [shippingAddress,nav])
        


  return (
        <div className="">
                <CheckoutSteps step1 step2 />

                <FormContainer  className={"app__shippingPage"}>
                        <div> 
                                <h1>Payment Method</h1>
                                <Form onSubmit={submithandler} >
                                                <Form.Group>
                                                        <Form.Label as="legend">
                                                                <h4>Select Method</h4> 
                                                        </Form.Label>
                                                <Col className='mx-4'>
                                                        <Form.Check className='my-2' type='radio' label="PayPal or Credit Card" id="PayPal" name="paymentMedthod" value="PayPal" checked onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
                                                        <Form.Check className='my-2' type='radio' label="Transfers" id="Transfers" name="paymentMedthod" value="Transfers"  onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
                                                        <Form.Check className='my-2' type='radio' label="Paystack" id="Paystack" name="paymentMedthod" value="Paystack"  onChange={(e)=>setPaymentMethod(e.target.value)} disabled></Form.Check>
                                                </Col>
                                                </Form.Group>
                                                <Button type='submit' variant="primary" className='checkoutBtn rounded my-2 shippingBtn' >
                                                        <span className='ml-4' >Continue</span> 
                                                        <svg        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 12l-20 12 5-12-5-12z"/></svg>
                                                </Button>

                                </Form>
                        </div>
                </FormContainer>
        </div>
  )
}

export default PaymentMethod