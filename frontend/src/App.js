import { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './components/Home';
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'
import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess'
import ListOrders from './components/order/ListOrder'
import OrderDetails from './components/order/OrderDetails'

import ProductDetails from './components/product/ProductDetails'
import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'


import ProtectedRoute from './components/route/ProtectedRoute'

import { loadUser } from './actions/user.actions'
import store from './store'

function App() {
  useEffect(() => {
    store.dispatch(loadUser())

  }, [])


  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/cart" component={Cart} exact />
          <ProtectedRoute path="/shipping" component={Shipping} />
          <ProtectedRoute path="/orders/confirm" component={ConfirmOrder} />
          
          <ProtectedRoute path="/success" component={OrderSuccess} />
          <ProtectedRoute path="/payment" component={Payment} />
            
        
          <Route path="/product/:id" component={ProductDetails} exact />
          <Route path="/login" component={Login} />
          <Route path="/password/forgot" component={ForgotPassword} exact />
          <Route path="/register" component={Register} />
          <Route path="/password/reset/:token" component={NewPassword} exact />


          <ProtectedRoute path="/me" component={Profile} exact />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
          <ProtectedRoute path="/password/update" component={UpdatePassword} exact />

          <ProtectedRoute path="/orders/me" component={ListOrders} exact />
          <ProtectedRoute path="/order/:id" component={OrderDetails} exact />


        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
