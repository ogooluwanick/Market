import React ,{useState, useEffect }from 'react'
import { Button, Image, Table,Toast ,ToastContainer} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LinkContainer} from 'react-router-bootstrap'
import moment from "moment"

import "./UserlistPage.scss"
import { adminDeleteUser, adminListUsers } from '../../actions/userActions'
import LoadingBox from '../../components/loadingbox/LoadingBox'
import MessageBox from '../../components/messagebox/MessageBox'

const UserlistPage = () => {
        const nav=useNavigate()
        const dispatch=useDispatch()

        const [notification, setnotification] = useState(false);
        const toggleNotification = () => setnotification((notification)=>!notification);

        const {loading,users,error} =useSelector(state=>state.adminUserList)
        const {userInfo} =useSelector(state=>state.userSignin)
        const {success,error:deleteError} =useSelector(state=>state.adminUserDelete)



        const userDeleteHandler=(id)=>{
                if (window.confirm("Are you sure?")){
                        dispatch(adminDeleteUser(id))
                        setnotification(true)
                        setTimeout(() => {
                                        setnotification(false)
                        }, 8000);
                }   
        }

        const NotificationToast =(props)=>{
                return(

                <ToastContainer position="top-end" className="userListNofifications">
                <Toast show={notification} onClose={toggleNotification} bg="secondary" >
                        <Toast.Header>
                        <img
                        src={userInfo.avater}
                        className="rounded me-2"
                        alt=""
                        style={{width: "6vh",height: "6vh",marginLeft:".6vh",objectFit:"cover"}}
                        />
                        <strong className="me-auto">Admin {userInfo.name.split(" ")[0]}</strong>
                        <small>{moment(new Date()).fromNow() }</small>
                        </Toast.Header>
                        <Toast.Body>{success ? "User Deleted":deleteError}</Toast.Body>
                </Toast>
                </ToastContainer>
                )
        }

        useEffect(() => {
                if((userInfo && userInfo.isAdmin) || success){
                        dispatch(adminListUsers())
                }
                else{
                        nav("/login")
                }
               
        }, [dispatch,userInfo,nav,success])
        
  return (
    <div>
            <h1>All Users</h1>
                <NotificationToast/>
            {
                    loading?<LoadingBox/>
                    :
                    error?<MessageBox variant="danger">{error}</MessageBox>
                    :
                    (
                            <Table striped bordered hover responsive className='table-sm'>
                                    <thead>
                                            <tr>
                                                    <th>ID</th>
                                                    <th>NAME</th>
                                                    <th>EMAIL</th>
                                                    <th>PHONE</th>
                                                    <th>ADMIN</th>
                                                    <th></th>
                                            </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                    users.map((user,index)=>(
                                                        <tr key={index}>
                                                                <td>{user._id}</td>
                                                                <td className='d-flex  align-items-start flex-wrap' style={{height:"100%"}}>
                                                                        <Image style={{width:"4vw",height:"5vh" , marginRight:"10px",minWidth:"50px",minHeight:"30px"}} src={user.avater} alt={user.name} fluid rounded></Image> <span>{user.name}</span>
                                                                </td> 
                                                                <td><a className='app__rm-textDecor' href={`mailto:${user.email}`}>{user.email}</a></td>
                                                                <td><a className='app__rm-textDecor' href={`tel:${user.phone}`}>{user.phone}</a></td>
                                                                <td>{user.isAdmin?
                                                                                (
                                                                                        <div className='app__flex'><svg style={{fill:"green"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.334 11.96c-.713-.726-.872-1.829-.393-2.727.342-.64.366-1.401.064-2.062-.301-.66-.893-1.142-1.601-1.302-.991-.225-1.722-1.067-1.803-2.081-.059-.723-.451-1.378-1.062-1.77-.609-.393-1.367-.478-2.05-.229-.956.347-2.026.032-2.642-.776-.44-.576-1.124-.915-1.85-.915-.725 0-1.409.339-1.849.915-.613.809-1.683 1.124-2.639.777-.682-.248-1.44-.163-2.05.229-.61.392-1.003 1.047-1.061 1.77-.082 1.014-.812 1.857-1.803 2.081-.708.16-1.3.642-1.601 1.302s-.277 1.422.065 2.061c.479.897.32 2.001-.392 2.727-.509.517-.747 1.242-.644 1.96s.536 1.347 1.17 1.7c.888.495 1.352 1.51 1.144 2.505-.147.71.044 1.448.519 1.996.476.549 1.18.844 1.902.798 1.016-.063 1.953.54 2.317 1.489.259.678.82 1.195 1.517 1.399.695.204 1.447.072 2.031-.357.819-.603 1.936-.603 2.754 0 .584.43 1.336.562 2.031.357.697-.204 1.258-.722 1.518-1.399.363-.949 1.301-1.553 2.316-1.489.724.046 1.427-.249 1.902-.798.475-.548.667-1.286.519-1.996-.207-.995.256-2.01 1.145-2.505.633-.354 1.065-.982 1.169-1.7s-.135-1.443-.643-1.96zm-12.584 5.43l-4.5-4.364 1.857-1.857 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.642z"/></svg></div>
                                                                                )
                                                                                :
                                                                                (
                                                                                        <div className='app__flex'><svg  style={{fill:"red"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z"/></svg></div> 
                                                                                )
                                                                }
                                                                                </td>
                                                                <td><LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                                                <Button variant='light' className='btn-sm'>   
                                                                                        <i className='fas fa-edit'></i>
                                                                                </Button>
                                                                        </LinkContainer>
                                                                        <Button variant='danger' className='btn-sm' onClick={()=>userDeleteHandler(user._id)}>   
                                                                                        <i className='fas fa-trash'></i>
                                                                        </Button>
                                                                </td>
                                                        </tr>
                                                    ))
                                            }
                                    </tbody>
                            </Table>
                    )
            }

            
    </div>
  )
}

export default UserlistPage