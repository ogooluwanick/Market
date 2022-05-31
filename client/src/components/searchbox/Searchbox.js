import React from 'react'
import { useNavigate } from 'react-router'
import { Form, Button} from 'react-bootstrap'

import "./Searchbox.scss"
import { useState } from 'react'


const Searchbox = () => {
        const nav=useNavigate()

        const [keyword, setKeyword] = useState("")

        const submitHandler=(e)=>{
                e.preventDefault()
                if (keyword.trim()){
                        nav(`/search/${keyword}`)
                        
                }
                else{
                        nav(`/`)
                }

        }


  return (
    <Form onSubmit={submitHandler} className="d-flex " >
            <Form.Control className="mr-sm-2 ml-sm-5 " type="text" name="searchbox" placeholder={"Search Products..."}  onChange={(e)=>{setKeyword(e.target.value)}} ></Form.Control>
            <Button type="submit" variant="outline-light" className="p-2 searchBtn" >
                <svg className='searchIcon' xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24"><path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"/></svg>
            </Button>
    </Form>
  )
}

export default Searchbox