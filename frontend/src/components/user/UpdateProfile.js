import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layouts/MetaData'

//import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, loadUser, clearErrors } from '../../actions/user.actions'
import { UPDATE_PROFILE_RESET } from '../../constants/user.constant'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({
    autoClose: 1500,
    draggable: false,
    position: toast.POSITION.BOTTOM_RIGHT,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
})

const UpdateProfile = ({ history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.png')

    // const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {

        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url)
        }

        if (error) {
            toast.error(error)
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success('Cập nhật thông tin thành công !')
            // alert.success('User updated successfully')
            dispatch(loadUser());

            history.push('/me')

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

    }, [dispatch, error, history, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);

        dispatch(updateProfile(formData))
    }

    const onChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])

    }
    return (
        <Fragment>
            <MetaData title={'Update Profile'} />
            <div className="gio-hang row d-flex justify-content-between">
                <div className="col-12 col-lg-12">
                    <span><a href='/me' style={{color:'#ff6666'}}><span className="fa fa-chevron-left"></span> Thông tin tài khoản </a>/ Cập nhật thông tin</span>
                    <section id="aa-myaccount">
                        <div className="">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="aa-myaccount-area">         
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="aa-myaccount-login">
                                                    <h4>Cập nhật thông tin</h4>
                                                    <form onSubmit={submitHandler} className="aa-login-form" encType='multipart/form-data'>
                                                        <label htmlFor="name_field">Tên đăng nhập</label>
                                                        <input 
                                                            type="text"
                                                            id="name_field"
                                                            className="form-control"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}>
                                                        </input>
                                                        <label htmlFor='avatar_upload'>Ảnh đại diện</label>
                                                        <div>
                                                            <figure className='avatar mr-3 item-rtl'>
                                                                <img
                                                                    src={avatarPreview}
                                                                    width='60px'
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
                                                                accept='image/*'
                                                                onChange={onChange}
                                                            />
                                                            <label className='custom-file-label' htmlFor='customFile'>
                                                                Chọn ảnh đại diện
                                                        </label>
                                                        </div>

                                                        
                                                        <button type="submit" className="aa-browse-btn" disabled={loading ? true : false} >Cập nhật</button>
                                                    </form>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="aa-myaccount-register">                 
                                                    <img width="600px" src="https://res.cloudinary.com/hha-nlnganh/image/upload/v1616936712/cap_nhat_thong_tin_tai_khoan_lkgqf1.png" alt="login image"></img>
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

export default UpdateProfile