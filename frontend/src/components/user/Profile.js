import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'

import Moment from 'react-moment';
import 'moment-timezone';

const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Your Profile'} />
                
                    <section id="aa-myaccount">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="aa-myaccount-area">         
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="aa-myaccount-login">
                                                    <h4>Thông tin cá nhân</h4>
                                                    <form className="aa-login-form">
                                                        <p>Tên người dùng: <strong>{user.name}</strong></p>
                                                        
                                                        <p>Địa chỉ emmail: <strong>{user.email}</strong></p>

                                                        
                                                        <p>Ngày tạo tài khoản: <strong><Moment format="hh:mm:ss - DD/MM/YYYY">{user.createdAt}</Moment></strong></p>
                                                        
                                                        {user.role !== 'admin' && (
                                                            <Link to="/orders/me" className="aa-browse-btn">
                                                                Đơn hàng
                                                            </Link>
                                                        )}

                                                        <Link to="/password/update" className="mt-10 aa-browse-btn">
                                                        <span className="mr-8 fa fa-key"></span>
                                                            Đổi mật khẩu
                                                        </Link>
                                                    </form>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="ra-giua-col aa-myaccount-register">                 
                                                <figure className='ra-giua avatar avatar-profile'>
                                                    <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
                                                </figure>
                                                <Link to="/me/update" id="edit_profile" className="aa-browse-btn">
                                                    <span className="mr-8 fa fa-edit"></span>
                                                     Chỉnh sửa tài khoản
                                                </Link>
                                                </div>
                                            </div>
                                        </div>          
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile