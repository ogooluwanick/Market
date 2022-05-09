import React ,{ useEffect,useState }from 'react'
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FileBase from 'react-file-base64';
import { LinkContainer} from 'react-router-bootstrap'
import moment from "moment"



import "./ProfilePage.scss"
import { detailsUsers, updateProfileUsers } from '../../actions/userActions'
import LoadingBox from '../../components/loadingbox/LoadingBox'
import MessageBox from '../../components/messagebox/MessageBox'
import { USER_UPDATE_RESET } from '../../constants/constants';
import { displayMyOrders } from '../../actions/orderActions';


const initialState= {
        firstName:"",
        lastName:"",
        email:"",
        password: "",
        avater:"",
        confirmPassword: ""
}

const ProfilePage = () => {
        const [formData, setFormData] = useState(initialState)
        const [passwordType, setpasswordType] = useState("password")
        const [nameError, setNameError] = useState('')

        const nav=useNavigate()
        const dispatch=useDispatch()


        const {user ,loading:loadinguser,erroruser } = useSelector(state=>state.userDetails)
        const {orders ,loading:ordersLoading,error:ordersErrors } = useSelector(state=>state.orderMyList)
        const {userInfo } = useSelector(state=>state.userSignin)
        const {success,loading,error } = useSelector(state=>state.userUpdateProfile)
        const {paySuccess } = useSelector(state=>state.orderPay)
        console.log("paySuccess",paySuccess)
        console.log("success",success)

        
        const passwordTypControl=()=>{
                if (passwordType==="password"){
                        setpasswordType("text")
                }
                else{
                        setpasswordType("password")
                }
            }

        const handleChange=(e)=>{
                setFormData({...formData, [e.target.name]: [e.target.value]})
        }


        const submitHandler=(e)=>{
                e.preventDefault()
                setNameError(null)

                if( String(formData.password).length > 0){
                        if(String(formData.password).length < 8) return setNameError('Password\'s  too weak! 😏 ')
                        if(String(formData.password) !== String(formData.confirmPassword)) return setNameError('Password\'s do not match! 😏')
                }
                
                dispatch(updateProfileUsers({id:user._id,
                                                                        firstName:formData.firstName ,
                                                                        lastName:formData.lastName,
                                                                        email:String(formData.email),
                                                                        password:String(formData.password),
                                                                        avater:String(formData.avater)
                                                                }))
        }


        useEffect(() => {
                if (!userInfo) return nav(`/login`)
                if(userInfo){
                        if(!user || !user?.name || success || paySuccess){
                                dispatch({type:USER_UPDATE_RESET})
                                dispatch(detailsUsers("profile"))
                                dispatch(displayMyOrders())

                        }
                        else{
                                setFormData({...formData, 
                                                                "firstName": [user.name.split(" ")[0]],
                                                                "lastName": [user.name.split(" ")[1]],
                                                                "email": [user.email],
                                                                "avater":[user.avater]
                                                        })
                        }
                } 
                // eslint-disable-next-line
              }, [userInfo,nav,user,dispatch,success,paySuccess])
  return (
    <Row className={"ProfilepageRow "} >
            <Col md={4} className={"userprofileUpdateForm "} >
                {
                        loadinguser? 
                        (
                                <div  className='loginFormHeader head-text'>
                                        <h1 ><span>User </span>Profile</h1>
                                </div>
                        )
                        :
                        (
                                <div  className='loginFormHeader head-text'>
                                        <h1 ><span>{user?.name?.split(" ")[0]}'s </span>Profile</h1>
                                </div>
                        )

                }
                

                {(error || erroruser)&&<MessageBox variant='danger'>{error} </MessageBox>}
                {nameError&&<MessageBox variant='danger'>{nameError} </MessageBox>}
                {success&&<MessageBox>Profile Updated</MessageBox>}
                
                
                <Form onSubmit={submitHandler} className={" "} >
                        <div className="avaterUploadContainer app__flex">
                                <div className={"avatar-wrapper  "}  >
                                        <img src={loadinguser?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS03toaZ810yqxEfpLvHxNrpSllc4CevOTfXC1fnP-QbQ&s":user?.avater} alt="user avater" className="profile-pic" />
                                        <div className="upload-button">
                                                <i className="fa fa-arrow-circle-up" aria-hidden="true" ></i>
                                        </div>
                                        <FileBase  className=" upload-button FileBaseUpdate " type="file" multiple={false} onDone={({base64})=>setFormData({...formData,avater:base64})}/>                           {/* work on making this functional */}
                                </div>
                                <div className=" FileBaseUpdate"  >
                                        <FileBase className=" FileBaseUpdate"  type="file" multiple={false} onDone={({base64})=>setFormData({...formData,avater:base64})}/>                          
                                </div>
                        </div>

                        <div style={{display:"flex",justifyContent:"space-between"}} className="my-2">
                                <Form.Group controlId='firstname'  className='mx-1'>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control name="firstName" type='text' value={formData.firstName} placeholder='First Name...'  onChange={handleChange} ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='lastname' className='mx-1'>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control  name="lastName" type='text' value={formData.lastName} placeholder='Last Name...'   onChange={handleChange}></Form.Control>
                                </Form.Group>
                        </div>
                        <Form.Group controlId='email' className="my-2">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control name="email" type='email' placeholder='Enter email...' value={formData.email}  onChange={handleChange}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password' className="my-2">
                                <Form.Label>Password</Form.Label>
                                <InputGroup className="mb-3">
                                        <Form.Control name="password" type={passwordType}  placeholder='Password...'   onChange={handleChange} ></Form.Control>
                                        <Button variant="outline-secondary" id="passwordEye1"  onClick={passwordTypControl} >
                                                {
                                                        passwordType === "password" ? 
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg> :
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z"/></svg>
                                                }
                                                
                                        </Button>
                                </InputGroup>
                        </Form.Group>
                        
                        <Form.Group controlId='confirmPassword' className="my-2">
                                <Form.Label>Confirm Password</Form.Label>
                                <InputGroup className="mb-3">
                                        <Form.Control  name="confirmPassword" type={passwordType} placeholder='Confirm Password...'   onChange={handleChange}></Form.Control>
                                        <Button variant="outline-secondary" id="passwordEye2"  onClick={passwordTypControl}>
                                                {
                                                        passwordType === "password" ? 
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg> :
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z"/></svg>
                                                }                                                        
                                        </Button>
                                </InputGroup>
                        </Form.Group>
                                        
                        <div className='d-flex justify-content-center my-3'>
                                        <Button className={"loginFormHeader-signinBtn"} type="submit" color='primary'   style={{width:"80%"}} >
                                        {
                                                loading?
                                                <LoadingBox  size={30} style={{backgroundColor:"pink"}}></LoadingBox>
                                                :
                                                ("Update")
                                        }
                                        </Button>
                        </div>
                </Form>
            </Col>
            <Col  className='mx-2 userOrdersList' md={7}>
                <h2>My Orders</h2>
                {
                        ordersLoading?<LoadingBox/>
                        :
                        ordersErrors?<MessageBox variant="danger">{ordersErrors}</MessageBox>
                        :
                        (
                                <Table striped bordered hover responsive className="table-sm ">
                                        <thead>
                                                <tr>
                                                        <th>ID</th>
                                                        <th>DATE</th>
                                                        <th>TOTAL</th>
                                                        <th>PAID</th>
                                                        <th>DELIVERED</th>
                                                        <th></th>
                                                </tr>
                                        </thead>
                                        <tbody>
                                                {orders.map((item,index)=>(
                                                        <tr key={index}>
                                                                <td>{item._id}</td>
                                                                <td>{ moment(item.createdAt).format('MMMM d, YYYY')}</td>
                                                                <td>₦{item.totalPrice}</td>
                                                                <td>{item.isPaid? moment(item.paidAt).format('Do [of] MMMM, YYYY [at] h:mma') :  (<div className='app__flex'><svg  style={{fill:"red"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z"/></svg></div> )}</td>
                                                                <td>{item.isDelivered? moment(item.isDelivered).format('Do [of] MMMM, YYYY [at] h:mma') : (<div className=' app__flex'><svg  style={{fill:"red"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z"/></svg></div>)}</td>
                                                                <td>
                                                                        <LinkContainer to={`/order/${item._id}`}>
                                                                                <Button className='btn-sm' variant='light' >Details</Button>
                                                                        </LinkContainer>
                                                                </td>
                                                        </tr> 
                                                ))}
                                        </tbody>

                                </Table>
                        )
                }
            </Col>

    </Row>
  )
}

export default ProfilePage