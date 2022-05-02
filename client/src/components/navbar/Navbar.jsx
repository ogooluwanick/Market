import React from 'react'
import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import { LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


import "./Navbar.scss"
import images from '../../constants/images'
import { signoutUsers } from '../../actions/userActions'


function NavBar() {
        const dispatch=useDispatch()
        const nav=useNavigate()

        const {userInfo }= useSelector(state=>state.userSignin)

        const handleLogout=()=>{
                dispatch(signoutUsers(nav))
        }

    

  return (
    <header>
            <Navbar  expand="lg" collapseOnSelect className='app__navbar' >
                <Container className='app__navbar-container      '>
                        <LinkContainer to="/">
                                <Navbar.Brand className='app__navbar-brand     app__flex'>
                                        <img src={images.sitelogo} alt="market-logo"  />
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
                                        {
                                                userInfo?
                                                (
                                                        <NavDropdown title={
                                                                        <div className='navbar_userInfo'>
                                                                                 <span>{userInfo.name.split(" ")[0]}</span>
                                                                                <img src={userInfo.avater} alt="user avater"  className='rounded-circle shadow-4'  style={{width: "5vh",height: "5vh",marginLeft:".6vh",objectFit:"cover"}} />  
                                                                         </div>    
                                                                } id='username'>
                                                                <LinkContainer to='/profile'>
                                                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                                                </LinkContainer>
                                                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                                        </NavDropdown>
                                                )
                                                :
                                                (
                                                        <LinkContainer to="/login">
                                                                <Nav.Link href="/login">
                                                                        <i className='fas fa-user'/>
                                                                        <span style={{marginLeft:"3px"}}>Sign In</span>
                                                                </Nav.Link>
                                                        </LinkContainer>
                                                )
                                        }
                                        
                                </Nav>
                        </Navbar.Collapse>
                </Container>
        </Navbar>
    </header>
  )
}

export default NavBar