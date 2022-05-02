import React, { useState } from 'react'
import {Form,Button,Row,Col, InputGroup} from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';

import "./Login.scss"
import FormContainer from '../../components/formContainer/FormContainer'
import { useEffect } from 'react';
import { signinUsers, signupUsers } from '../../actions/userActions';
import MessageBox from '../../components/messagebox/MessageBox';
import LoadingBox from '../../components/loadingbox/LoadingBox';

const initialState= {
        firstName:"",
        lastName:"",
        email:"",
        password: "",
        confirmPassword: ""
}

const Login = () => {
    const [passwordType, setpasswordType] = useState("password")
    const [isSignup, setisSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [nameError, setNameError] = useState('')


    const {userInfo,loading,error } = useSelector(state=>state.userSignin)

    const dispatch =useDispatch()
    const nav = useNavigate()
    const location=useLocation()


    const redirect = new URLSearchParams(location.search).get("redirect")                     //get qty from url
    ? String(new URLSearchParams(location.search).get("redirect"))
    :" ";



    const passwordTypControl=()=>{
        if (passwordType==="password"){
                setpasswordType("text")
        }
        else{
                setpasswordType("password")
        }
    }

    

    const handleSwitch=()=>{
        setisSignup((prevIsSignup)=>!prevIsSignup) 
        setpasswordType("password")
    }

    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name]: [e.target.value]})
}

        
    const submitHandler=(e)=>{
        e.preventDefault()
        setNameError(null)


        if (!isSignup){
                dispatch(signinUsers(formData,nav, redirect))
        }
        else{
                if(String(formData.password).length <= 0) { setNameError('Password\'s is too weak! 😏 ')}
                if(String(formData.password).length <8) { setNameError('Password\'s  too weak! 😏 ')}
                if(String(formData.password) !== String(formData.confirmPassword)) return setNameError('Password\'s do not match! 😏')
                
                dispatch(signupUsers(formData,nav, redirect))
        }
    }

    useEffect(() => {
      if (userInfo) return nav(`/${redirect}`)

    }, [userInfo,nav,redirect])
    
    
  return (
    <FormContainer>
            <div  className='loginFormHeader'>
                <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17 9.761v-4.761c0-2.761-2.238-5-5-5-2.763 0-5 2.239-5 5v4.761c-1.827 1.466-3 3.714-3 6.239 0 4.418 3.582 8 8 8s8-3.582 8-8c0-2.525-1.173-4.773-3-6.239zm-8-4.761c0-1.654 1.346-3 3-3s3 1.346 3 3v3.587c-.927-.376-1.938-.587-3-.587s-2.073.211-3 .587v-3.587zm4 11.723v2.277h-2v-2.277c-.596-.347-1-.984-1-1.723 0-1.104.896-2 2-2s2 .896 2 2c0 .738-.404 1.376-1 1.723z"/></svg>
                </div>
                <h1 >{isSignup?"Sign Up":"Sign In"}</h1>
            </div>

            {error&&<MessageBox>{error} </MessageBox>}
            {nameError&&<MessageBox>{nameError} </MessageBox>}
            
            
            <Form onSubmit={submitHandler} >
                    {
                        isSignup && (
                        <div style={{display:"flex",justifyContent:"space-between"}} className="my-2">
                                <Form.Group controlId='firstname'  className='loginFormHeader-nameSTY'>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control name="firstName" type='text' placeholder='First Name...'  onChange={handleChange} required></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='lastname' className='loginFormHeader-nameSTY'>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control  name="lastName" type='text' placeholder='Last Name...' required  onChange={handleChange}></Form.Control>
                                </Form.Group>
                        </div>)
                    }
                    <Form.Group controlId='email' className="my-2">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control name="email" type='email' placeholder='Enter email...'  required onChange={handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password' className="my-2">
                            <Form.Label>Password</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control name="password" type={passwordType}  placeholder='Password...' required  onChange={handleChange} ></Form.Control>
                                <Button variant="outline-secondary" id="button-addon1"  onClick={passwordTypControl} >
                                        {
                                                passwordType === "password" ? 
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg> :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z"/></svg>
                                        }
                                        
                                </Button>
                            </InputGroup>
                    </Form.Group>
                    {
                                isSignup && (
                                        <Form.Group controlId='confirmPassword' className="my-2">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <InputGroup className="mb-3">
                                                        <Form.Control  name="confirmPassword" type={passwordType} placeholder='Confirm Password...'  required onChange={handleChange}></Form.Control>
                                                        <Button variant="outline-secondary" id="button-addon1"  onClick={passwordTypControl}>
                                                                {
                                                                        passwordType === "password" ? 
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg> :
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z"/></svg>
                                                                }                                                        
                                                        </Button>
                                                </InputGroup>
                                                </Form.Group>
                                )
                    }
                    <div className='d-flex justify-content-center mt-3'>
                                <Button className={"loginFormHeader-signinBtn"} type="submit" color='primary'   style={{width:"80%"}} >
                                {
                                        loading?<LoadingBox  size={30} style={{backgroundColor:"pink"}}></LoadingBox>
                                        :
                                        (
                                                
                                                isSignup?"Sign Up":"Sign In"
                                                
                                        )
                                }
                                       
                                </Button>
                    </div>
            </Form>
                    <Row>
                            <Col className='d-flex justify-content-end'>
                                                <Button type='submit' className='btn btn-light my-3' onClick={handleSwitch} >
                                                        {
                                                                isSignup?"Already have an Account? Sign in":"Don't have an Account? Sign up"
                                                        }
                                                </Button>
                            </Col>
                    </Row>

    </FormContainer>
  )
}

export default Login