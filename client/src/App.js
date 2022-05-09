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
import ShippingPage from './pages/shipping/ShippingPage';
import PaymentMethod from './pages/paymentMethod/PaymentMethod';
import PlaceOrder from './pages/placeOrder/PlaceOrder';
import OrderDetailsPage from './pages/orderDetails/OrderDetailsPage';
import UserlistPage from './pages/userlistPage/UserlistPage';
import ErrorPage from './pages/errorPage/ErrorPage';
import UserEditPage from './pages/userEdit/UserEditPage';



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
                                       <Route path={'/shipping'}  element={ <ShippingPage/>} /> 
                                       <Route path={'/payment'}  element={ <PaymentMethod/>} /> 
                                       <Route path={'/placeorder'}  element={ <PlaceOrder/>} /> 
                                       <Route path={'/order/:id'}  element={ <OrderDetailsPage/>} /> 

                                       

                                       <Route path={'/login'}  element={ <Login/>} /> 
                                       <Route path={'/profile'}  element={ <ProfilePage/>} /> 
                                       <Route path={'/admin/users'}  element={ <UserlistPage/>} /> 
                                       <Route path={'/admin/user/:id/edit'}  element={ <UserEditPage/>} /> 


                                       <Route path="*"  element={<ErrorPage/>}/>


                                </Routes>
                        </Container>
                </main>

                <Footer/>
        </div>
    </Router>
  );
}

export default App;
