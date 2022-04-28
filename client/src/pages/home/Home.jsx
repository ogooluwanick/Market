import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';


import "./Home.scss"
import Products from '../../components/products/Products'
import { listProducts } from '../../actions/productActions';
import LoadingBox from '../../components/loadingbox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';



const Home = () => {
        const dispatch=useDispatch()
        const  {products,loading,error} = useSelector((state)=>state.productList);
        
        useEffect(() => {
                dispatch(listProducts())
        }, [dispatch] )
        
  return (
    <div className='app__home'>
            <h1>Latest Products</h1>
            {
                    loading? <LoadingBox/>
                        :
                    error? <MessageBox variant='danger'>{error}</MessageBox>
                        :
                        (
                                <Row>
                                {
                                        products?.map((product, index)=>(
                                                <Col key={index} sm={12} md={6} lg={4} xl={3}> 
                                                        <Products product={product} />                                        
                                                </Col>
                                        ))
                                        

                                }
                                </Row>
                        )
            }
    </div>
  )
}

export default Home