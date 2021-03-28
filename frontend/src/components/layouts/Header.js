import React, { Fragment } from 'react';
import {  Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
//import { useAlert } from 'react-alert'
import { logout } from '../../actions/user.actions'
import Search from './Search'
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
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                        <img alt="logo image" src="/images/logonew.png" />
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Route render={({ history }) => <Search history={history} />} />
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to="/cart" style={{ textDecoration: 'none' }} >
                        <span id="cart" className="ml-3"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Giỏ hàng</span>
                        <span className="ml-1" id="cart_count">{cartItems.length}</span>
                    </Link>
                    {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                {user && user.role === 'admin' && (
                                    <Link className="dropdown-item" to="/dashboard">Trang quản trị</Link>
                                )}
                                <Link className="dropdown-item" to="/orders/me">Đơn hàng</Link>
                                <Link className="dropdown-item" to="/me">Thông tin tài khoản</Link>
                                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                    Logout
                                </Link>

                            </div>


                        </div>

                    ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Đăng nhập</Link>}

                </div>
            </nav>
        </Fragment>
    )
}

export default Header
