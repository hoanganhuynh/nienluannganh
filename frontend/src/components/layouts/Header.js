import React, { Fragment } from 'react';
import {  Route, Link } from 'react-router-dom'
import Search from './Search'
import '../../App.css'
// eslint-disable-next-line
const Header = () => {
    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                        <img alt="logo image" src="/images/logo.png" />
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Route render={({ history }) => <Search history={history} />} />
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to="/login" className="btn ml-4" id="login_btn">Đăng nhập</Link>

                    <span id="cart" className="ml-3"><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    </span>
                    <span className="ml-1" id="cart_count">2</span>
                </div>
            </nav>
        </Fragment>
    )
}

export default Header
