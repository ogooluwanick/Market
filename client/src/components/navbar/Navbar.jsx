import React from 'react'
import "./Navbar.scss"
import { Navbar, Container, Nav} from 'react-bootstrap'
import { LinkContainer} from 'react-router-bootstrap'

import images from '../../constants/images'


function NavBar() {
  return (
    <header>
            <Navbar  expand="lg" collapseOnSelect className='app__navbar' >
                <Container className='app__navbar-container      '>
                        <LinkContainer to="/">
                                <Navbar.Brand className='app__navbar-brand     app__flex'>
                                        <img src={images.sitelogo} alt="market-logo" className='app__navbar-logo' />
                                        <span>Market</span> 
                                </Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" >
                                <Nav className=" app__navbar-links ">
                                        <LinkContainer to="/cart">
                                                <Nav.Link href="/cart">
                                                        <i className='fas fa-shopping-cart'/> 
                                                        <span style={{marginLeft:"3px"}}>Cart</span>
                                                </Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to="/login">
                                                <Nav.Link href="/login">
                                                        <i className='fas fa-user'/>
                                                        <span style={{marginLeft:"3px"}}>Sign In</span>
                                                </Nav.Link>
                                        </LinkContainer>
                                </Nav>
                        </Navbar.Collapse>
                </Container>
        </Navbar>
    </header>
  )
}

export default NavBar