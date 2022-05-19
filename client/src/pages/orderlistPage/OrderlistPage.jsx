import React ,{useState, useEffect }from 'react'
import { Button, Table,Toast ,ToastContainer} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LinkContainer} from 'react-router-bootstrap'
import moment from "moment"

import "./OrderlistPage.scss"
import LoadingBox from '../../components/loadingbox/LoadingBox'
import MessageBox from '../../components/messagebox/MessageBox'
import { displayAllOrders } from '../../actions/orderActions'

const OrderlistPage = () => {
        const nav=useNavigate()
        const dispatch=useDispatch()

        const [notification, setnotification] = useState(false);
        const toggleNotification = () => setnotification((notification)=>!notification);

        const {loading,orders,error} =useSelector(state=>state.adminOrderList)
        const {userInfo} =useSelector(state=>state.userSignin)



     

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
                        <Toast.Body></Toast.Body>
                </Toast>
                </ToastContainer>
                )
        }

        useEffect(() => {
                if((userInfo && userInfo.isAdmin) ){
                        dispatch(displayAllOrders())
                }
                else{
                        nav("/login")
                }
               
        }, [dispatch,userInfo,nav])
        
  return (
    <div>
            <h1>All Orders</h1>
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
                                                    <th>USER</th>
                                                    <th>DATE</th>
                                                    <th>PAYMENT METHOD</th>
                                                    <th>TOTAL</th>
                                                    <th>PAID</th>
                                                    <th>DELIVERED</th>
                                            </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                    orders.map((order,index)=>(
                                                        <tr key={index}>
                                                                <td>{order._id}</td>
                                                                <td>{order.user && order.user.name }</td>
                                                                <td>{moment(order.createdAt).fromNow() }</td>
                                                                <td>{order.paymentMethod}</td>
                                                                <td>₦{order.totalPrice}</td>
                                                                <td>{order.isPaid?
                                                                                (
                                                                                        <div className='app__flex'>{moment(order.paidAt).format('D[/]MM[/]YYYY [at] h:mma')}</div>
                                                                                )
                                                                                :
                                                                                (
                                                                                        <div className='app__flex'><svg  style={{fill:"red"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z"/></svg></div> 
                                                                                )
                                                                        }
                                                                </td>
                                                                <td>{order.isDelivered?
                                                                                (
                                                                                        <div className='app__flex'>{moment(order.deliveredAt).format('D[/]MM[/]YYYY [at] h:mma')}</div>
                                                                                )
                                                                                :
                                                                                (
                                                                                        <div className='app__flex'><svg  style={{fill:"red"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z"/></svg></div> 
                                                                                )
                                                                        }
                                                                </td>
                                                                <td><LinkContainer to={`/order/${order._id}`}>
                                                                                <Button variant='light' className='btn-sm'>   
                                                                                        Details
                                                                                </Button>
                                                                        </LinkContainer>
                                                                        
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

export default OrderlistPage