import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';


import "./Home.scss"
import Products from '../../components/products/Products'
import { listProducts } from '../../actions/productActions';
import LoadingBox from '../../components/loadingbox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';
import Paginate from '../../components/paginate/Paginate';
import ProductCarousel from '../../components/carousel/ProductCarousel';
import Meta from '../../components/metaTags/Meta';



const Home = () => {
        const dispatch=useDispatch()
        const {keyword,pageNumber} =useParams()
        const  {products,page, pages,loading,error} = useSelector((state)=>state.productList);
        
        useEffect(() => {
                dispatch(listProducts(keyword,(pageNumber||1)))
        }, [dispatch,keyword,pageNumber] )
        
  return (
    <div className='app__home '>
            <Meta />
            {
                !keyword ? <ProductCarousel />
                :
                <Link to={"/"} className="btn btn-outline-primary my-3 rounded"><i className="fa-solid fa-arrow-left"/>    Go Back</Link>
            }
            <h1>Latest Products</h1>
            {
                    loading? <LoadingBox/>
                        :
                    error? <MessageBox variant='danger'>{error}</MessageBox>
                        :
                        (
                                <>
                                <Row>
                                {
                                        products?.map((product, index)=>(
                                                <Col key={index} sm={12} md={6} lg={4} xl={3}> 
                                                        <Products product={product} />                                        
                                                </Col>
                                        ))
                                        

                                }
                                </Row>
                                <Paginate page={page}  pages={pages} keyword={keyword ?  keyword : ""}/>
                                </>
                        )
            }
    </div>
  )
}

export default Home