import React ,{useState, useEffect }from 'react'
import { Button, Row, Table,Toast ,ToastContainer,Col, Image} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { LinkContainer} from 'react-router-bootstrap'
import moment from "moment"

import "./ProductlistPage.scss"
import LoadingBox from '../../components/loadingbox/LoadingBox'
import MessageBox from '../../components/messagebox/MessageBox'
import { adminCreateProduct, adminDeleteProduct, listProducts } from '../../actions/productActions'
import { CREATE_PRODUCT_RESET } from '../../constants/constants'
import Paginate from '../../components/paginate/Paginate'

const ProductlistPage = () => {
        const  {pageNumber} =useParams()
        const nav=useNavigate()
        const dispatch=useDispatch()

        const [notification, setnotification] = useState(false);
        const toggleNotification = () => setnotification((notification)=>!notification);

        const {loading,products,error,page,pages} =useSelector(state=>state.productList)
        const {userInfo} =useSelector(state=>state.userSignin)
        const {success:deleteSuccess,error:deleteError,loading:deleteLoading} =useSelector(state=>state.adminProductDelete)
        const {product,error:createError,loading:createLoading} =useSelector(state=>state.adminProductCreate)



        const createProductHandler=()=>{
               dispatch(adminCreateProduct(nav))
        }

        const productDeleteHandler=(id)=>{
                if (window.confirm("Are you sure?")){
                        dispatch(adminDeleteProduct(id))
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
                        alt="user avater"
                        style={{width: "6vh",height: "6vh",marginLeft:".6vh",objectFit:"cover"}}
                        />
                        <strong className="me-auto">Admin {userInfo.name.split(" ")[0]}</strong>
                        <small>{moment(new Date()).fromNow() }</small>
                        </Toast.Header>
                        <Toast.Body>{deleteSuccess ? "Proudct Deleted":deleteError?deleteError:product?"Product Created"  :createError}</Toast.Body>
                </Toast>
                </ToastContainer>
                )
        }

        useEffect(() => {
                dispatch({type:CREATE_PRODUCT_RESET})
                if((userInfo && userInfo.isAdmin)){
                        dispatch(listProducts( "",(pageNumber||1)))
                }
                else{
                        nav("/login")
                }

                if(deleteSuccess || deleteError ||product ||createError){
                        setnotification(true)
                        setTimeout(() => {
                                        setnotification(false)
                        }, 8000);
                }
               
        }, [dispatch,userInfo,nav,deleteSuccess,deleteError,product,createError,pageNumber])
        
  return (
    <div>
             <NotificationToast/>

            <Row className='   align-items-center   '>
                <Col>
                        <h1>All Products</h1>
                </Col>
                <Col className="d-flex justify-content-end flex-wrap">
                        <Button className='my-3 rounded ' onClick={createProductHandler}>
                                {
                                        createLoading?<LoadingBox color={"white"} text={""} size="16"/>
                                        :
                                        (<span><i className='fas fa-plus'></i> Create Product</span>)
                                }
                        </Button>
                </Col>
            </Row>
            
            {
                    loading?<LoadingBox/>
                    :
                    error?<MessageBox variant="danger">{error}</MessageBox>
                    :
                    (
                    <>
                            <Table striped bordered hover responsive className='table-sm'>
                                    <thead>
                                            <tr>
                                                    <th>ID</th>
                                                    <th>NAME</th>
                                                    <th>PRICE</th>
                                                    <th>CATEGORY</th>
                                                    <th>BRAND</th>
                                            </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                    products.map((product,index)=>(
                                                        <tr key={index}>
                                                                <td>{product._id}</td>
                                                                <td className='d-flex  align-items-start flex-wrap' style={{height:"100%"}}>
                                                                        <Link to={`/products/${product._id}`}  className="app__rm-textDecor">
                                                                                <Image style={{width:"4vw",height:"5vh" , marginRight:"10px",minWidth:"50px",minHeight:"30px"}} src={product.image} alt={product.name} fluid rounded></Image> <span>{product.name}</span>
                                                                        </Link>
                                                                </td>
                                                                <td>₦{product.price}</td>
                                                                <td>{product.category}</td>
                                                                <td>{product.brand}</td>
                                                               
                                                                <td><LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                                                <Button variant='light' className='btn-sm'>   
                                                                                        <i className='fas fa-edit'></i>
                                                                                </Button>
                                                                        </LinkContainer>
                                                                        <Button variant='danger' className='btn-sm' onClick={()=>productDeleteHandler(product._id)}>   
                                                                                        {
                                                                                                deleteLoading? (<LoadingBox size={15}  color={"snow"} text={""}/>)
                                                                                                :
                                                                                                <i className='fas fa-trash'></i>
                                                                                        }
                                                                        </Button>
                                                                </td>
                                                        </tr>
                                                    ))
                                            }
                                    </tbody>
                                    
                            </Table>
                        <Paginate page={page} pages={pages} isAdmin={true}/>
                    </>
                    )
            }

            
    </div>
  )
}

export default ProductlistPage