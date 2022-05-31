import React from 'react'
import { useEffect } from 'react'
import {Carousel, Image} from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


import { listTopCarousel } from '../../actions/productActions'
import LoadingBox from '../loadingbox/LoadingBox';
import MessageBox from '../messagebox/MessageBox';
import "./ProductCarousel.scss"




const ProductCarousel = () => {
        const dispatch =useDispatch()

        const {loading,products, error}=useSelector(state=>state.productTopCarousel)
       
        useEffect(() => {
                dispatch(listTopCarousel())
        }, [dispatch])

  return (
                loading?<LoadingBox/>:
                error?<MessageBox variant="danger">{error}</MessageBox>:
                (
                        <Carousel pause="hover" className="bg-dark">
                                {
                                        products.map((product,index)=>(
                                                <Carousel.Item key={index}>
                                                        <Link to={`/products/${product._id}`}>
                                                                <Image fluid src={product.image} alt={`carousel ${product.name}`}/>
                                                                <Carousel.Caption className="carousel-caption">
                                                                        <h2>
                                                                                {product.name} (₦{product.price})
                                                                        </h2>
                                                                </Carousel.Caption>
                                                        </Link>

                                                </Carousel.Item>
                                        ))
                                }
                        </Carousel>
                )
   
  )
}

export default ProductCarousel