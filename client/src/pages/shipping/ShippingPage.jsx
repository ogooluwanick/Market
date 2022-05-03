import React ,{ useState }from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Form} from 'react-bootstrap'


import "./ShippingPage.scss"
import FormContainer from '../../components/formContainer/FormContainer'
import { saveShippingAddress } from '../../actions/cartActions'
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps'


const ShippingPage = () => {
        const {shippingAddress}= useSelector(state=>state.cart)

        const [address, setAddress] = useState(shippingAddress?.address)
        const [city, setCity] = useState(shippingAddress?.city)
        const [postcode, setPostcode] = useState(shippingAddress?.postcode)
        const [country, setCountry] = useState(shippingAddress?.country)

        const nav=useNavigate()
        const dispatch=useDispatch()  

        const submithandler=(e)=>{
                e.preventDefault()
                dispatch(saveShippingAddress({address,city,postcode,country}))
                nav("/payment")
        }

return (
        <div className="">
                <CheckoutSteps step1 step2 />

                <FormContainer  className={"app__shippingPage"}>
                        <div> 
                                <h1>Shipping</h1>
                                <Form onSubmit={submithandler} >
                                                <Form.Group controlId='address'  >
                                                        <Form.Label>Address</Form.Label>
                                                        <Form.Control  name="address" type='text' placeholder='Address...' value={address} onChange={(e)=>setAddress(e.target.value)} required></Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId='city'  >
                                                        <Form.Label>City</Form.Label>
                                                        <Form.Control name="city" type='text' placeholder='City...' value={city} onChange={(e)=>setCity(e.target.value)} required></Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId='postcode'  >
                                                        <Form.Label>Postcode</Form.Label>
                                                        <Form.Control name="postcode" type='text' placeholder='Postcode...' value={postcode} onChange={(e)=>setPostcode(e.target.value)} required></Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId='country'  >
                                                        <Form.Label>Country</Form.Label>
                                                        <Form.Control name="country" type='text' placeholder='Country...' value={country} onChange={(e)=>setCountry(e.target.value)} required></Form.Control>
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

export default ShippingPage