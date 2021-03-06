import { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/layouts/_Header';
// import SliderPhoto from './components/layouts/SliderPhoto';
// import MenuCategory from './components/layouts/MenuCategory';
import Footer from './components/layouts/Footer';
import Home from './components/Home';
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'
import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess'
import ListOrders from './components/order/ListOrder'
import OrderDetails from './components/order/OrderDetails'

import ProductsList from './components/admin/ProductList'
import CategoriesList from './components/admin/CategoriesList'
import NewProduct from './components/admin/NewProduct'
import NewCategory from './components/admin/NewCategory'
import UpdateProduct from './components/admin/UpdateProduct'
import UpdateCategory from './components/admin/UpdateCategory'
import OrdersList from './components/admin/OrdersList'
import ProcessOrder from './components/admin/ProcessOrder'
import UsersList from './components/admin/UserList'
import UpdateUser from './components/admin/UpdateUser'
import ProductReviews from './components/admin/ProductReview'

import ProductDetails from './components/product/ProductDetails'
import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'

// Admin Imports
import Dashboard from './components/admin/Dashboard'
// import HeaderAdmin from './components/layouts/HeaderAdmin'

import ScrollToTop from "react-scroll-to-top";



import ProtectedRoute from './components/route/ProtectedRoute'

import { loadUser } from './actions/user.actions'
import store from './store'

function App() {
  useEffect(() => {
    store.dispatch(loadUser())

  }, [])
  const { user, isAuthenticated, loading, auth} = useSelector(state => state.auth)
  // if(auth && auth.user && auth.user.role === 'user') {
  //   document.getElementsByClassName('headerAdmin')[0].classList.add("hide-main-header");
  // }

  return (
    <Router>
      <div className="App">
      {/* <HeaderAdmin /> */}
        <Header />
        <ScrollToTop smooth />
        
        <div className="container-fluid">
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

          <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact />
          <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList} exact />
          <ProtectedRoute path="/admin/categories" isAdmin={true} component={CategoriesList} exact />
          <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact />
          <ProtectedRoute path="/admin/category" isAdmin={true} component={NewCategory} exact />
          <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact />
          <ProtectedRoute path="/admin/category/:id" isAdmin={true} component={UpdateCategory} exact />
          <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList} exact />
          <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact />
          <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact />
          <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact />
          <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReviews} exact />

        </div>
        
        <Footer />
        {/* {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Fragment>
            <Footer />
          </Fragment>
        )} */}
        
      </div>
    </Router>
  );
}

export default App;
