import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import "./Products.scss"
import Rating from './Rating'

const Products = ({product}) => {
        
  return (
    <Card className="my-3 p-3 rounded productCard" >
            <Link to={`/products/${product._id}`} >
                    <Card.Img src={product.image} variant="top"  className={"productCard-img"}/>
             </Link>
            <Card.Body className="productCardBody">
                <Link to={`/products/${product._id}`}   className="app__rm-textDecor productCardTitle  ">    
                        <Card.Title as={"div"}>
                                <strong>{product.name}</strong>
                        </Card.Title>
                </Link>
                <Card.Text as={"div"}>
                        <div className='my-3'> 
                                <Rating rating={product.rating}  text={`${product.numReviews} reviews`}/>
                        </div>
                </Card.Text>
                <Card.Text as={"h3"}>
                        ₦{product.price} 
                </Card.Text>
            </Card.Body>
    </Card>
  )
}

export default Products