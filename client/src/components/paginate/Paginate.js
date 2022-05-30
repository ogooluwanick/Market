import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({pages,page,isAdmin,keyword=""}) => {
  return (      pages>1 && (
          <Pagination>
                 {
                      
                         [...Array(pages).keys()].map((x,index)=>(
                                 <LinkContainer key={index} to={!isAdmin? 
                                                                                                (keyword ? `/search/${keyword}/page/${x+1}`: `/page/${x+1}`)
                                                                                                :
                                                                                                `/admin/products/${x+1}`
                                                                }>
                                         <Pagination.Item active={x+1===page}>{x+1}</Pagination.Item>

                                 </LinkContainer>
                         ))
                      
                 }
          </Pagination>
  )
   
  )
}

export default Paginate