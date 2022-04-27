import React from 'react'
import "./Footer.scss"
import { Col, Container, Row } from 'react-bootstrap'

import "./Footer.scss"

const Footer = () => {
  return (
    <footer className='app__footer'>
            <Container>
                <Row>
                        <Col className="text-center">Copyright &copy;  Market</Col>
                </Row>
            </Container>
    </footer>
  )
}

export default Footer