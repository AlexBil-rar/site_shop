import React  from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";
import ProductDetail from "./views/ProductDetail";
import Cart from "./views/Cart";
import Register from "./views/Register";
import Login from "./views/Login";
import PersonalAccount from "./views/PersonalAccount";
import Shipping from './views/Shipping';
import Payment from './views/Payment';
import PlaceOrder from './views/PlaceOrder';
import Order from './views/Order';
import AdminUsersList from './views/AdminUsersList';
import AdminProductsList from './views/AdminProductsList';
import AdminOrderList from './views/AdminOrderList';
import AdminNews from "./views/AdminNews";
import Cooperation from "./views/cooperation";
import DeliveryPayment from "./views/delivery.payment";
import Requisites from "./views/requisites";
import TermsWarranties from "./views/terms.warranties";
import styled from 'styled-components';
import './styles/app.css'
import Category from "./views/Category";
import BNewsList from "./components/BNewsList";
import AdminSlider from "./views/AdminSlider";
import Brand from "./views/Brand";
import AdminBrands from "./views/AdminBrands";

const App = () => {

  styled.body`
    font: 1rem Helvetica;
    height: 100vh;
    margin: 0;
  `;


  return (
      <Router>
      <div className="grid-container">
        <Header />
        <main className="Main">
        <div className="wrapper-cooperation">
            <Route path="/delivery&payment" component={DeliveryPayment} />
            <Route path="/requisites" component={Requisites} />
            <Route path="/terms&warranties" component={TermsWarranties} />
            <Route path="/news" component={BNewsList}/>
            <Route path="/cooperation" component={Cooperation} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route path="/brand/:id" component={Brand} />
            <Route path="/category/:id" component={Category} />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/profile" component={PersonalAccount} />
            <Route path="/shipping" component={Shipping} />
            <Route path="/payment" component={Payment} />
            <Route path="/placeorder" component={PlaceOrder} />
            <Route path="/order/:id" component={Order} />
            <Route path="/admin/users" component={AdminUsersList} />
            <Route path="/admin/brands" component={AdminBrands} />
            <Route path="/admin/news" component={AdminNews} />
            <Route path="/admin/slider" component={AdminSlider} />
            <Route path="/admin/products" component={AdminProductsList} exact />
            <Route path="/admin/products/:pageNumber" component={AdminProductsList} exact/>
            <Route path="/admin/orders" component={AdminOrderList} />
            <Route path="/search/:keyword" component={Home} exact />
            <Route path="/page/:pageNumber" component={Home} exact />
            <Route path='/slider'component={Home} />
            <Route path="/search/:keyword/page/:pageNumber" component={Home} exact />
            <Route path="/" component={Home} exact />
            </div>
            </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
