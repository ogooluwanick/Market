import React from 'react'
import { useEffect,useState } from 'react'
import { Col, Image,ListGroup,Card,Button, Row,Form, Modal } from 'react-bootstrap'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {detailsProduct, reviewProduct} from "../../actions/productActions"
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";



import Rating from "../../components/products/Rating"
import "./ProductPage.scss"
import LoadingBox from '../../components/loadingbox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';
import moment from 'moment';
import { PRODUCT_REVIEW_RESET } from '../../constants/constants';




 

const ProductPage = () => {
        const {id: productsID}=useParams()
        const dispatch=useDispatch()
        const nav=useNavigate()
        
        const [modalShow, setModalShow] =useState(false);

        const {product,loading ,error  }=useSelector((state)=>state.productDetails)
        const {success,loading:reviewLoading,error:reviewError }=useSelector((state)=>state.productReview)
        const {userInfo } = useSelector(state=>state.userSignin)
       

        const imagesModal=  product?.showcaseImgs?.map((img)=>({original:img, thumbnail:img    }))   //mapping array from api to local array for modal gallery
           

        const [qty, setQty] = useState(1)
        const [rating, setRating] = useState(0)
        const [comment, setComment] = useState("")

        const addToCartHandle=()=>{
                nav(`/cart/${productsID}?qty=${qty}`)

        }
      
        const submitHandler=(e)=>{
                e.preventDefault()
                dispatch(reviewProduct(productsID,{rating,comment}))
        }


        const ImgSliderModal=(props)=> {
                return (
                  <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        <span>{product.name}  gallery</span>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ImageGallery items={imagesModal} />
                    </Modal.Body>
                  </Modal>
                );
              }




        useEffect(() => {
                if(success){
                        alert("Review Submitted")
                        setRating(0)
                        setComment("")
                        dispatch({type:PRODUCT_REVIEW_RESET})
                }
          dispatch(detailsProduct(productsID))
          window.scrollTo(0, 0)

        }, [dispatch,productsID,success])
        
console.log(product?.rating, product?.numReviews)
  return (
    <div className='app__ProductPage'>
            <Link to={"/"} className="btn btn-outline-primary my-3 rounded"><i className="fa-solid fa-arrow-left"/>    Go Back</Link>
                {
                        loading?<LoadingBox/>
                        :
                        error?<MessageBox variant='danger'>{error}</MessageBox>
                        :
                        (
                                <>
                                <Row>
                                        <Col md={6}>
                                                <Image src={product?.image} alt={product?.name} fluid  className='app__ProductPage-Img rounded' onClick={()=>setModalShow(true)}/>  
                                        </Col>
                                        <Col md={3}>
                                                <ListGroup variant='flush'>
                                                        <ListGroup.Item className='app__ProductPage-listGroup '>
                                                                <h3 >{product?.name}</h3>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className='app__ProductPage-listGroup'>
                                                        <Rating rating={product?.rating} text={`${product?.numReviews} reviews`} />
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className='app__ProductPage-listGroup'>
                                                        <span>Price: ₦{product?.price} </span> 
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className='app__ProductPage-listGroup p-text'>
                                                        <span>Description: {product?.description} </span> 
                                                        </ListGroup.Item>
                                                </ListGroup>
                                        </Col>
                                        <Col md={3}>
                                                <Card >
                                                        <ListGroup variant='flush'>
                                                                <ListGroup.Item>
                                                                        <Row>
                                                                                <Col>
                                                                                        Price: 
                                                                                </Col>
                                                                                <Col>
                                                                                        ₦{product?.price}
                                                                                </Col>
                                                                        </Row>
                                                                </ListGroup.Item>
                                                                <ListGroup.Item>
                                                                        <Row>
                                                                                <Col>
                                                                                        Status: 
                                                                                </Col>
                                                                                <Col>
                                                                                        {product?.countInStock?"In Stock":"Out of Stock"}
                                                                                </Col>
                                                                        </Row>
                                                                </ListGroup.Item>
                                                                {
                                                                        product.countInStock >=  0 && 
                                                                        (
                                                                                <ListGroup.Item>
                                                                                        <Row>
                                                                                                <Col>
                                                                                                        Qty: 
                                                                                                </Col>
                                                                                                <Col>
                                                                                                       <Form.Control as="select"  value={qty} onChange={(e) =>{setQty(e.target.value)}}> 
                                                                                                               { 
                                                                                                                        [...Array(product.countInStock).keys()].map((item)=>(
                                                                                                                                <option key={item+1} value={item+1}>{item+1}  </option>
                                                                                                                                ))
                                                                                                                }
                                                                                                       </Form.Control>
                                                                                                </Col>
                                                                                        </Row>
                                                                                </ListGroup.Item>
                                                                        )
                                                                }
                                                                <ListGroup.Item className=' mx-auto '>
                                                                        <Button  className='btn-block  checkoutBtn ' type='button' disabled={product?.countInStock<=0} onClick={addToCartHandle}>
                                                                                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M13.5 18c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm-3.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm14-16.5l-.743 2h-1.929l-3.473 12h-13.239l-4.616-11h2.169l3.776 9h10.428l3.432-12h4.195zm-12 4h3v2h-3v3h-2v-3h-3v-2h3v-3h2v3z"/></svg>
                                                                                <span >  Add to Cart</span> 
                                                                        </Button>
                                                                </ListGroup.Item>
                                                        </ListGroup>
                                                </Card>
                                        </Col>

                                        <ImgSliderModal show={modalShow} onHide={() => setModalShow(false)}/>

                                </Row>
                                <Row>
                                        <Col md={6}>
                                                <h2 className='my-3'>Reviews</h2>
                                                {product.reviews.length===0 && <MessageBox>No Reviews </MessageBox>}
                                                <ListGroup variant='flush' >
                                                                {
                                                                        product.reviews.map((review,index)=>(
                                                                                <ListGroup.Item key={index}>
                                                                                        <strong>{review.name}</strong>
                                                                                        <Rating rating={review?.rating} text={product?.numReviews.length===1? `${!product?.numReviews} reviews`: `${product?.numReviews} review`} />
                                                                                        <p>{moment(review.createdAt).fromNow() }</p>
                                                                                        <p>{review.comment}</p>
                                                                                </ListGroup.Item>
                                                                        ))
                                                                }
                                                </ListGroup>
                                                <ListGroup.Item>
                                                        <h2>Write a Customer Review</h2>
                                                        {reviewError&&<MessageBox variant="danger">{reviewError}</MessageBox>}
                                                        {
                                                                userInfo?(
                                                                        <Form onSubmit={submitHandler}>
                                                                        <Form.Group controlId='rating'>
                                                                                <Form.Label>Rating</Form.Label>
                                                                                <Form.Control as="select" value={rating} onChange={(e)=>setRating(e.target.value)}>
                                                                                        <option value="" >Select... </option>
                                                                                        <option value="1">   1- Poor </option>
                                                                                        <option value="2">  2- Fair  </option>
                                                                                        <option value="3">  3- Good  </option>
                                                                                        <option value="4">  4- Very Good  </option>
                                                                                        <option value="5">  5- Great  </option>
                                                                                </Form.Control>
                                                                        </Form.Group>
                                                                        <Form.Group>
                                                                                <Form.Label>Comment</Form.Label>
                                                                                <Form.Control as="textarea" row={"3"}  value={comment} onChange={(e)=>setComment(e.target.value)}></Form.Control>
                                                                        </Form.Group>
                                                                        <Button className='my-2' type="submit" variant='primary'>{reviewLoading?<LoadingBox size={20} text=""/>:"Submit"}</Button>
                                                                        </Form>
                                                                ):<MessageBox >Please <Link to={"/login"}>signin to</Link> review</MessageBox>
                                                        }
                                                </ListGroup.Item>        
                                        </Col>
                                </Row>
                                </>
                        )
                }
    </div>
  )
}

export default ProductPage