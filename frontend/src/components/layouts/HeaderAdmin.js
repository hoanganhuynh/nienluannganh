import React, { Fragment } from 'react';
import {  Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/user.actions'
import Search from './Search'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const HeaderAdmin = () => {

    //const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth)
    // const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout());
        toast.info('Đã đăng xuất tài khoản. Hẹn gặp lại !')
        //alert.success('Logged out successfully.')
    }

    // function hideMainHeader() {
    //     document.getElementById('aa-header').classList.add("hide-main-header");
    //     document.getElementById('aa-footer').classList.add("hide-main-header");
        
    // }
    setTimeout(() => {
        // hideMainHeader()
    },400)

    return (
        <Fragment>
            <header className="headerAdmin" id="aa-header">
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

                                        <li><span className="fa fa-shield"></span><a href="/">Trang chủ</a></li>
                                        
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
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
    )
}

export default HeaderAdmin
