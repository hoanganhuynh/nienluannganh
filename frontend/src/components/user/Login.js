import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'

//import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/user.actions'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = ({ history, location }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //const alert = useAlert();
    //const notify = () => toast()
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {

        if (isAuthenticated) {
            toast.success('Đăng nhập thành công!')
            history.push(redirect)
        }

        if (error) {
            toast.error(error)
            dispatch(clearErrors());
        }

    }, [dispatch, isAuthenticated, error, history])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Đăng nhập'} />

                    <section id="aa-myaccount">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="aa-myaccount-area">         
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="aa-myaccount-login">
                                                    <h4>Đăng nhập</h4>
                                                    <form onSubmit={submitHandler} className="aa-login-form">
                                                        <label for="">Địa chỉ email<span>*</span></label>
                                                        <input 
                                                            type="email"
                                                            id="email_field"
                                                            className="form-control"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}>
                                                        </input>
                                                        <label for="">Mật khẩu<span>*</span></label>
                                                        <input
                                                            type="password"
                                                            id="password_field"
                                                            className="form-control"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}>
                                                        </input>
                                                        <button type="submit" className="aa-browse-btn">Đăng nhập</button>
                                                        {/* <label className="rememberme" for="rememberme"><input type="checkbox" id="rememberme"></input>Remember me</label> */}
                                                        <br></br>
                                                        <br></br>
                                                        <p className="aa-lost-password"><a href="/password/forgot">Quên mật khẩu?</a></p>
                                                        <p className="aa-lost-password"><a href="/register">Đăng ký</a></p>
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
                </Fragment>
            )}
        </Fragment>
    )
}

export default Login