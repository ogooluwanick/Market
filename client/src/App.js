import React from 'react'
import {Container} from "react-bootstrap"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"


import './App.scss';
import NavBar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import ProductPage from './pages/product/ProductPage';
import CartPage from './pages/cart/CartPage';
import Login from './pages/login/Login';
import ProfilePage from './pages/profile/ProfilePage';


function App() {
  return (
    <Router>
        <div className="App">
                <NavBar/>

                <main >
                        <Container>
                                <Routes>
                                       <Route path='/' element={ <Home/>} exact/> 
                                       <Route path='/products/:id' element={ <ProductPage/>}/> 

                                       <Route path={'/cart/'}  element={ <CartPage/>} /> 
                                       <Route path={'/cart/:id'}  element={ <CartPage/>} /> 

                                       <Route path={'/login'}  element={ <Login/>} /> 
                                       <Route path={'/profile'}  element={ <ProfilePage/>} /> 




                                </Routes>
                        </Container>
                </main>

                <Footer/>
        </div>
    </Router>
  );
}

export default App;
