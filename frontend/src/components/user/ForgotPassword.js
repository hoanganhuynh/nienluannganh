import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layouts/MetaData'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../../actions/user.actions'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const dispatch = useDispatch();

    const { error, loading, message } = useSelector(state => state.forgotPassword)

    useEffect(() => {

        if (error) {
            toast.error(error)
            dispatch(clearErrors());
        }

        if (message) {
            toast.success(message)
        }

    }, [dispatch, error, message])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email);

        dispatch(forgotPassword(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Quên Mật khẩu'} />

            {/* <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false} >
                            Send Email
                    </button>

                    </form>
                </div>
            </div> */}

            <section id="aa-myaccount">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="aa-myaccount-area">         
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="aa-myaccount-login">
                                            <h4>Quên mật khẩu</h4>
                                            <form onSubmit={submitHandler} className="aa-login-form">
                                                <label for="">Địa chỉ email<span>*</span></label>
                                                <input 
                                                    type="email"
                                                    id="email_field"
                                                    className="form-control"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}>
                                                </input>
                                                
                                                <button 
                                                    id="forgot_password_button"
                                                    type="submit"
                                                    className="btn btn-block py-3"
                                                    disabled={loading ? true : false}
                                                    className="aa-browse-btn"
                                                >Gửi Email</button>
                                            </form>
                                        </div>
                                    </div>
                                {/* <div className="col-md-6">
                                    <div className="aa-myaccount-register">                 
                                        <h4>Register</h4>
                                        <form action="" className="aa-login-form">
                                            <label for="">Username or Email address<span>*</span></label>
                                            <input type="text" placeholder="Username or email"></input>
                                            <label for="">Password<span>*</span></label>
                                            <input type="password" placeholder="Password"></input>
                                            <button type="submit" className="aa-browse-btn">Register</button>                    
                                        </form>
                                    </div>
                                </div> */}

                                <div className="col-md-6">
                                    <div className="aa-myaccount-register">                 
                                        <img width="600px" src="https://res.cloudinary.com/hha-nlnganh/image/upload/v1616589301/slider/forgot_password_pmvtlf.png" alt="forgot image"></img>
                                    </div>
                                </div>
                                </div>          
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </Fragment>
    )
}

export default ForgotPassword