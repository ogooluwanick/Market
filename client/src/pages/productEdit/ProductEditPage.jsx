import React ,{ useEffect,useState }from 'react'
import { Button, Form, Image, Toast, ToastContainer } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import FileBase from 'react-file-base64';
import moment from "moment"



import "./ProductEditPage.scss"
import LoadingBox from '../../components/loadingbox/LoadingBox'
import MessageBox from '../../components/messagebox/MessageBox'
import FormContainer from '../../components/formContainer/FormContainer';
import { UPDATE_PRODUCT_RESET } from '../../constants/constants';
import { adminUpdateProduct, detailsProduct } from '../../actions/productActions';


const initialState= {
        name:"",
        description:"",
        brand:"",
        category:"",
        image:"",
        showcaseImgs:[],
        price:0,
        countInStock:0,
}

const ProductEditPage = () => {
        const [formData, setFormData] = useState(initialState)

        const dispatch=useDispatch()
        const {id}= useParams()

        const [notification, setnotification] = useState(false);
        const toggleNotification = () => setnotification((notification)=>!notification);

        const {product:productDetails,loading:detailsLoading,error:detailsError  }=useSelector((state)=>state.productDetails)
        const {success:updateSuccess,loading:updateLoading,error:updateError } = useSelector(state=>state.adminProductUpdate)
        const {userInfo } = useSelector(state=>state.userSignin)


        const handleChange=(e)=>{
                        setFormData({...formData, [e.target.name]: [e.target.value]})                
        }


        const submitHandler=(e)=>{
                e.preventDefault()                
                dispatch(adminUpdateProduct(id,{
                                                                        id:productDetails._id,
                                                                        name:String(formData.name) ,
                                                                        description:String(formData.description),
                                                                        brand:String(formData.brand),
                                                                        category:String(formData.category),
                                                                        image:String(formData.image),
                                                                        showcaseImgs:String(formData.showcaseImgs) ,
                                                                        price:Number(formData.price),
                                                                        countInStock:String(formData.countInStock),
                                                                        
                                                                }))
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
                        <Toast.Body>{updateSuccess ? "User Updated":updateError}</Toast.Body>
                </Toast>
                </ToastContainer>
                )
        }

console.log("showcaseImgs",formData.showcaseImgs)

        useEffect(() => {
                if(updateSuccess){
                        dispatch({type:UPDATE_PRODUCT_RESET})
                        dispatch(detailsProduct(id))
                }
                else{
                        if((!productDetails?.name || productDetails?._id !== id) || updateSuccess  ){
                                dispatch(detailsProduct(id))
                        }
                        else{
                                setFormData({...formData, 
                                        "name": [productDetails.name],
                                        "description": [productDetails.description],
                                        "brand": [productDetails.brand],
                                        "category":[productDetails.category],
                                        "image":[productDetails.image],
                                        "showcaseImgs": productDetails.showcaseImgs,
                                        "price": [productDetails.price],
                                        "countInStock":[productDetails.countInStock]
                                       
                                })
                        }
                }
                
                              
                // eslint-disable-next-line
              }, [productDetails,dispatch,id,updateSuccess])
  return (
    < >
                <Link to={"/admin/products"} className="btn btn-outline-primary my-3 rounded"><i className="fa-solid fa-arrow-left"/>    Go Back</Link>
                <NotificationToast/>
                <FormContainer  className={"adminUpdateUserForm "} >
                        <h1 className='head-text'>Edit<span> Product</span></h1>    
                        {
                                detailsLoading  ?<LoadingBox/>
                                :
                                detailsError|| updateError ?<MessageBox variant="danger">{detailsError || updateError}</MessageBox>
                                :
                                (
                                        <Form onSubmit={submitHandler} className={" "} >
                                                {(detailsError)&&<MessageBox variant='danger'>{detailsError} </MessageBox>}
                                                {updateSuccess&&<MessageBox>Profile Updated</MessageBox>}
                                        <div className="avaterUploadContainer app__flex">
                                                <div className={"avatar-wrapper  "}  >
                                                        <img src={`${productDetails.image}`} alt="productDetails avater" className="profile-pic" />
                                                       
                                                </div>
                                                <div className=" FileBaseUpdate"  >
                                                        <FileBase className=" FileBaseUpdate"  type="file" multiple={false} onDone={({base64})=>setFormData({...formData,image:base64})}/>                          
                                                </div>
                                        </div>
                
                                       
                                        <Form.Group controlId='name'  className='my-2'>
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control name="name" type='text' value={formData.name} placeholder='Enter Product Name...'  onChange={handleChange} ></Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='description' className='my-2'>
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control  name="description" type='text' value={formData.description} placeholder='Enter Description...'   onChange={handleChange}></Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='brand' className="my-2">
                                                <Form.Label>Brand</Form.Label>
                                                <Form.Control name="brand" type='text' placeholder='Enter Brand...' value={formData.brand}  onChange={handleChange}></Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='category' className="my-2">
                                                <Form.Label>Category</Form.Label>
                                                <Form.Control name="category" type='text' placeholder='Enter Category...' value={formData.category}  onChange={handleChange}></Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='price' className="my-2">
                                                <Form.Label>Price (₦)</Form.Label>
                                                <Form.Control name="price" type='text' placeholder='Enter Price...' value={formData.price}  onChange={handleChange}></Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='countInStock' className="my-2">
                                                <Form.Label>Count of Stock</Form.Label>
                                                <Form.Control name="countInStock" type='text' placeholder='Count of Stock...' value={formData.countInStock}  onChange={handleChange}></Form.Control>
                                        </Form.Group>

                                        <div className='d-flex flex-column align-content-center my-4  upload_image_container'>
                                                <div className='d-flex  align-content-center justify-content-center flex-wrap'>
                                                        {
                                                                productDetails.showcaseImgs.map((img,index)=>(
                                                                        <Image className='m-2' key={index} style={{width:"6h",height:"6vh"  ,minWidth:"50px",minHeight:"50px"}} src={img} alt={`product image roll ${index}`} fluid rounded></Image> 
                                                                ))
                                                        }

                                                </div>
                                                <div className='d-flex  align-content-center justify-content-center my-1 '>
                                                        <FileBase className=" FileBaseUpdate"  multiple={ false } onDone={({base64})=>setFormData({...formData,showcaseImgs:[base64]})}/>                       {/*muiltiple imageupload error   */}
                                                </div>

                                        </div>
                                       
                                        
                                        
                                        
                                                        
                                        <div className='d-flex justify-content-center my-3' >
                                                        <Button className={"adminEditUser-updateBtn"} type="submit" color='primary'  disabled={updateLoading} style={{width:"80%"}} >
                                                        {
                                                                updateLoading?
                                                                <LoadingBox  size={30} ></LoadingBox>
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

export default ProductEditPage