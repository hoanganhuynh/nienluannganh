import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layouts/MetaData'

//import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/user.actions'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const Register = ({ history }) => {
    
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })
    
    const { name, email, password } = user;
    
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.png')
    
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);
    

    useEffect(() => {

        if (isAuthenticated) {
            toast.success('Đăng ký thành công!')
            history.push('/')
        }

        if (error) {
            toast.error(error)
            dispatch(clearErrors());
        }

    }, [dispatch, isAuthenticated, error, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);

        dispatch(register(formData))
    }

    const onChange = e => {
        if (e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    return (
        <Fragment>

            <MetaData title={'Register User'} />

            <section id="aa-myaccount">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="aa-myaccount-area">         
                                <div className="row">
                                    
                                <div className="col-md-6">
                                    <div className="aa-myaccount-register">                 
                                        <h4>Đăng ký tài khoản</h4>
                                        <form onSubmit={submitHandler} encType='multipart/form-data' className="aa-login-form">
                                            <label>Nhập tên tài khoản<span>*</span></label>
                                            <input
                                                type="name"
                                                id="name_field"
                                                className="form-control"
                                                name='name'
                                                value={name}
                                                onChange={onChange}
                                            ></input>

                                            <label>Địa chỉ Email<span>*</span></label>
                                            <input
                                                type="email"
                                                id="email_field"
                                                className="form-control"
                                                name='email'
                                                value={email}
                                                onChange={onChange}
                                            ></input>
                                            <label for="">Mật khẩu<span>*</span></label>
                                            <input 
                                                type="password"
                                                id="password_field"
                                                className="form-control"
                                                name='password'
                                                value={password}
                                                onChange={onChange}
                                            ></input>
                                            <label for="">Ảnh đại diện</label>
                                            <div className='custom-avatar-input'>
                                                <div>
                                                    <figure className='choose-avatar'>
                                                        <img
                                                            src={avatarPreview}
                                                            className='rounded-circle'
                                                            alt='Avatar Preview'
                                                        />
                                                    </figure>
                                                </div>
                                                <div className='custom-file'>
                                                    <input
                                                        type='file'
                                                        name='avatar'
                                                        className='custom-file-input'
                                                        id='customFile'
                                                        accept="images/*"
                                                        onChange={onChange}
                                                    />
                                                    <label className='custom-file-label' htmlFor='customFile'>
                                                        Chọn ảnh đại diện
                                                    </label>
                                                </div>
                                            </div>
                                            <button
                                            id="register_button"
                                            type="submit"
                                            
                                            disabled={loading ? true : false}
                                            className="aa-browse-btn">
                                                Đăng ký
                                            </button>                    
                                        </form>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="aa-myaccount-register">                 
                                        <img width="600px" src="https://res.cloudinary.com/hha-nlnganh/image/upload/v1616591311/slider/Mesa_de_trabajo_1_rvpwj6.png" alt="register image"></img>
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

export default Register