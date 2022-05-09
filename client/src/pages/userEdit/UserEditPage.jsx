import React ,{ useEffect,useState }from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import FileBase from 'react-file-base64';


import "./UserEditPage.scss"
import {  adminUpdateProfileUsers, detailsUsers } from '../../actions/userActions'
import LoadingBox from '../../components/loadingbox/LoadingBox'
import MessageBox from '../../components/messagebox/MessageBox'
import FormContainer from '../../components/formContainer/FormContainer';
import { ADMIN_USER_UPDATE_RESET } from '../../constants/constants';


const initialState= {
        firstName:"",
        lastName:"",
        email:"",
        avater:"",
}

const UserEditPage = () => {
        const [formData, setFormData] = useState(initialState)
        const [isAdmin, setIsAdmin] = useState(false)

        const dispatch=useDispatch()
        const {id}= useParams()



        const {user ,loading:loadinguser,error:erroruser } = useSelector(state=>state.userDetails)
        const {success,loading:updateLoading,error:updateError } = useSelector(state=>state.adminUserUpdate)
        // const {userInfo } = useSelector(state=>state.userSignin)


        const handleChange=(e)=>{
                        setFormData({...formData, [e.target.name]: [e.target.value]})                
        }


        const submitHandler=(e)=>{
                e.preventDefault()                
                dispatch(adminUpdateProfileUsers({id:user._id,
                                                                        firstName:formData.firstName ,
                                                                        lastName:formData.lastName,
                                                                        email:String(formData.email),
                                                                        phone:String(formData.phone),
                                                                        isAdmin:isAdmin,
                                                                        avater:String(formData.avater)

                                                                },id))
        }
        console.log("user",formData)

        useEffect(() => {
                if(success){
                        dispatch({type:ADMIN_USER_UPDATE_RESET})
                }
                else{
                        if((!user?.name || user?._id) !== id){
                                dispatch(detailsUsers(id))
                        }
                        else{
                                setFormData({...formData, 
                                        "firstName": [user.name.split(" ")[0]],
                                        "lastName": [user.name.split(" ")[1]],
                                        "email": [user.email],
                                        "avater":[user.avater],
                                        "phone":[user.phone],
                                })
                                setIsAdmin( user.isAdmin)
                        }
                }
                
                              
                // eslint-disable-next-line
              }, [user,dispatch,id,success])
  return (
    < >
                <Link to={"/admin/users"} className="btn btn-outline-primary my-3 rounded"><i className="fa-solid fa-arrow-left"/>    Go Back</Link>
                <FormContainer  className={"adminUpdateUserForm "} >
                        <h1 className='head-text'>Edit<span> User</span></h1>    
                        {
                                loadinguser  ?<LoadingBox/>
                                :
                                erroruser|| updateError ?<MessageBox variant="danger">{erroruser || updateError}</MessageBox>
                                :
                                (
                                        <Form onSubmit={submitHandler} className={" "} >
                                                {/* {(error || erroruser)&&<MessageBox variant='danger'>{error} </MessageBox>} */}
                                                {success&&<MessageBox>Profile Updated</MessageBox>}
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
                                        <Form.Group controlId='phone' className="my-2">
                                                <Form.Label>Phone no</Form.Label>
                                                <Form.Control name="phone" type='text' placeholder='Enter phone no...' value={formData.phone}  onChange={handleChange}></Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='isAdmin' className="my-2">
                                                <Form.Check type='checkbox' label='Is Admin' checked={isAdmin}   onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                                        </Form.Group>
                                        
                                        
                                        
                                                        
                                        <div className='d-flex justify-content-center my-3'>
                                                        <Button className={"adminEditUser-updateBtn"} type="submit" color='primary'   style={{width:"80%"}} >
                                                        {
                                                                updateLoading?
                                                                <LoadingBox  size={30} style={{backgroundColor:"pink"}}></LoadingBox>
                                                                :
                                                                ("Update")
                                                        }
                                                        </Button>
                                        </div>
                                </Form>
                                )

                        }    
                
                        
                
                
               
            </FormContainer>

    </>
  )
}

export default UserEditPage