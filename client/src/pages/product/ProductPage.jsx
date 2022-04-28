import React from 'react'
import { useEffect } from 'react'
import { Col, Image,ListGroup,Card,Button, Row } from 'react-bootstrap'
import {Link, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {detailsProduct} from "../../actions/productActions"



import Rating from "../../components/products/Rating"
import "./ProductPage.scss"
import LoadingBox from '../../components/loadingbox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';

const ProductPage = () => {
        const {id: productsID}=useParams()
        const dispatch=useDispatch()
        const {product,loading ,error  }=useSelector((state)=>state.productDetails)


        useEffect(() => {
          dispatch(detailsProduct(productsID))
          window.scrollTo(0, 0)

        }, [dispatch,productsID])
        

  return (
    <div className='app__ProductPage'>
            <Link to={"/"} className="btn btn-outline-primary my-3 rounded"><i className="fa-solid fa-arrow-left"/>    Go Back</Link>
                {
                        loading?<LoadingBox/>
                        :
                        error?<MessageBox variant='danger'>{error}</MessageBox>
                        :
                        (
                                <Row>
                                        <Col md={6}>
                                                <Image src={product?.image} alt={product?.name} fluid/>  
                                        </Col>
                                        <Col md={3}>
                                                <ListGroup variant='flush'>
                                                        <ListGroup.Item className='app__ProductPage-listGroup'>
                                                                <h3 >{product?.name}</h3>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className='app__ProductPage-listGroup'>
                                                        <Rating rating={product?.rating} text={`${product?.numReviews} reviews`} />
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className='app__ProductPage-listGroup'>
                                                        <span>Price: ₦{product?.price} </span> 
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className='app__ProductPage-listGroup'>
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
                                                                <ListGroup.Item className=' mx-auto '>
                                                                        <Button  className='btn-block ' type='button' disabled={product?.countInStock<=0}>Add to Cart</Button>
                                                                </ListGroup.Item>
                                                        </ListGroup>
                                                </Card>
                                        </Col>

                                </Row>
                        )
                }
    </div>
  )
}

export default ProductPage