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
            <Button type="submit" variant="outline-success" className="p-2" >
                    Search
            </Button>
    </Form>
  )
}

export default Searchbox