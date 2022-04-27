import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useState,useEffect } from 'react'
import axios from "axios"


import "./Home.scss"
import Products from '../../components/products/Products'



const Home = () => {
        const [products, setProducts] = useState([])

        useEffect(() => {
          const fetchProducts=async()=>{
                const {data} =await axios.get("/products")

                setProducts(data)
        }
                fetchProducts()
        }, [] )
        
  return (
    <div className='app__home'>
            <h1>Latest Products</h1>
            <Row>
                    {
                        products.map((product, index)=>(
                                <Col key={index} sm={12} md={6} lg={4} xl={3}> 
                                        <Products product={product} />                                        
                                </Col>
                        ))
                        

                    }
               
            </Row>
    </div>
  )
}

export default Home