import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layouts/MetaData'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/user.actions'
import { UPDATE_PASSWORD_RESET } from '../../constants/user.constant'

const UpdatePassword = ({ history }) => {


    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();

    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {

        if (error) {
            toast.error(error)
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success('😊 Cập nhật mật khẩu thành công !')
            history.push('/me')
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    }, [dispatch, error, history, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);

        dispatch(updatePassword(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Đổi mật khẩu'} />
            <div className="gio-hang row d-flex justify-content-between">
                <div className="col-12 col-lg-12">
                <span><a href='/me' style={{color:'#ff6666'}}><span className="fa fa-chevron-left"></span> Thông tin tài khoản </a>/ Cập nhật mật khẩu</span>

                    <section id="aa-myaccount">
                        <div className="">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="aa-myaccount-area">         
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="aa-myaccount-login">
                                                    <h4>Đổi mật khẩu</h4>
                                                    <form onSubmit={submitHandler} className="aa-login-form">
                                                        <label for="">Mật khẩu cũ<span>*</span></label>
                                                        <input 
                                                            type="password"
                                                            id="email_field"
                                                            className="form-control"
                                                            value={oldPassword}
                                                            required
                                                            onChange={(e) => setOldPassword(e.target.value)}>
                                                        </input>
                                                        <label for="">Mật khẩu mới<span>*</span></label>
                                                        <input
                                                            type="password"
                                                            id="password_field"
                                                            className="form-control"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}>
                                                        </input>
                                                        {/* <button type="submit" className="aa-browse-btn">Đăng nhập</button> */}
                                                        <button id="submit" type="submit" className="aa-browse-btn" disabled={loading ? true : false} >Cập nhật mật khẩu</button>

                                                        {/* <label className="rememberme" for="rememberme"><input type="checkbox" id="rememberme"></input>Remember me</label> */}
                                                        {/* <br></br>
                                                        <br></br>
                                                        <p className="aa-lost-password"><a href="/password/forgot">Quên mật khẩu?</a></p>
                                                        <p className="aa-lost-password"><a href="/register">Đăng ký</a></p> */}
                                                    </form>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="aa-myaccount-register">                 
                                                    <img width="600px" src="https://res.cloudinary.com/hha-nlnganh/image/upload/v1616588460/slider/login_c6pzuf.png" alt="login image"></img>
                                                </div>
                                            </div>
                                        </div>          
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdatePassword