import React, { Fragment } from 'react';
import {  Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
//import { useAlert } from 'react-alert'
import { logout } from '../../actions/user.actions'
import Search from './Search'
// import '../../App_.css'
// import '../../App.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// eslint-disable-next-line
const Header = () => {

    //const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout());
        toast.info('Đã đăng xuất tài khoản. Hẹn gặp lại !')
        //alert.success('Logged out successfully.')
    }

    return (
        <Fragment>
            <header id="aa-header">
                <div className="aa-header-top">
                    <div className="container">
                        <div className="row">
                        <div className="col-md-12">
                            <div className="aa-header-top-area">
                            {/* <!-- start header top left --> */}
                            <div className="aa-header-top-left">
                                
                                {/* <!-- start cellphone --> */}
                                <div className="cellphone hidden-xs">
                                <p><span className="fa fa-phone"></span>0327-846-162</p>
                                </div>
                                <div className="cellphone hidden-xs">
                                <p><span className="fa fa-user"></span>B1706560</p>
                                </div>
                                {/* <!-- / cellphone --> */}
                            </div>
                            {/* <!-- / header top left --> */}
                            {user ? (
                                <div className="aa-header-top-right">
                                    <ul className="aa-head-top-nav-right">
                                        <li className="hidden-xs">
                                            <img width="24px" src={user.avatar && user.avatar.url}
                                        alt={user && user.name} className="rounded-circle"></img>
                                        </li>
                                        <li><a className="text-danger" href="/me">Xin chào, {user && user.name}</a></li>
                                        {user && user.role === 'admin' && (
                                            // <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                            <li><span className="fa fa-shield"></span><a href="/dashboard">Trang quản trị</a></li>
                                        )}
                                        <li className="hidden-xs"><span className="fa fa-shopping-cart"></span><a href="/orders/me">Đơn hàng</a></li>
                                        <li className="hidden-xs"><span className="fa fa-user"></span><a href="/me">Thông tin cá nhân</a></li>
                                        {/* <li className="hidden-xs"><a href="#">Logout</a></li>
                                        <li><a href="" data-toggle="modal" data-target="#login-modal">Logout</a></li> */}
                                        {/* <Link className="hidden-xs" to="/" onClick={logoutHandler}>
                                            Logout
                                        </Link> */}
                                        <li className="hidden-xs"><span className="fa fa-sign-out"></span><a href="/" onClick={logoutHandler}>Đăng xuất</a></li>
                                    </ul>
                                </div>
                            ): !loading &&
                                <div className="aa-header-top-right">
                                    <ul className="aa-head-top-nav-right">
                                        {/* <li><a href="" data-toggle="modal" data-target="#login-modal">Login</a></li> */}
                                        <li className="hidden-xs"><a href="/login">Đăng nhập</a></li>
                                        {/* <Link to="/login" className="hidden-xs" id="">Login</Link> */}
                                    </ul>
                                </div>
                            }
                            
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

    
                <div className="aa-header-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="aa-header-bottom-area">
                                
                                    <div className="aa-logo">
                                        
                                        <a href="/">
                                        <span className="fa fa-shopping-cart"></span>
                                        <p>daily<strong>Shop</strong> <span>Uy tín - Chất lượng</span></p>
                                        </a>
                                        
                                    </div>
                                    
                                    <div className="aa-cartbox">
                                        <a className="aa-cart-link" href="/cart">
                                        <span className="fa fa-shopping-basket"></span>
                                        <span className="aa-cart-title">Giỏ hàng</span>
                                        {cartItems.length > 0 ? (<span className="aa-cart-notify">{cartItems.length}</span>) : ('')}
                                        
                                        </a>
                                        
                                    </div>
                                    
                                    <div className="aa-search-box">
                                        {/* <form action="">
                                            <input type="text" name="" id="" placeholder="Search here ex. 'man' ">
                                            <button type="submit"><span className="fa fa-search"></span></button>
                                        </form> */}
                                        <Route render={({ history }) => <Search history={history} />} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
    )
}

export default Header
