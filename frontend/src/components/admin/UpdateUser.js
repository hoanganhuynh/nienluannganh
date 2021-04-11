import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch, useSelector } from 'react-redux'
import { updateUser, getUserDetails, clearErrors } from '../../actions/user.actions'
import { UPDATE_USER_RESET } from '../../constants/user.constant'

const UpdateUser = ({ history, match }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const dispatch = useDispatch();

    const { error, isUpdated } = useSelector(state => state.user);
    const { user } = useSelector(state => state.userDetails)

    const userId = match.params.id;

    useEffect(() => {

        console.log(user && user._id !== userId);
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role)
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success('Cập nhật thông tin thành công !')

            history.push('/admin/users')

            dispatch({
                type: UPDATE_USER_RESET
            })
        }

    }, [dispatch, error, history, isUpdated, userId, user])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('role', role);

        dispatch(updateUser(user._id, formData))
    }


    return (
        <Fragment>
            <MetaData title={`Update User`} />
            <div className="pRow row">
                <div className="col-12 col-md-3 pl-0">
                    <Sidebar />
                </div>


                <div style={{padding: 0}} className="new-product update-profile-admin col-12 col-md-5">
                    <Fragment>
                        <div style={{height:'95vh'}} className="ra-giua item-in-cart wrapper my-5">
                            <form style={{width:'85%'}} className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Cập nhật thông tin</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Tên</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="role_field">Vai trò</label>

                                    <select
                                        id="role_field"
                                        className="form-control"
                                        name='role'
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>

                                <button
                                    style={{width: '100%', borderRadius:'4px', backgroundColor:'dodgerblue', border:'none'}}
                                    // id="login_button"
                                    type="submit"
                                    className="aa-browse-btn aa-browse-btn-admin"
                                    // disabled={loading ? true : false}
                                >
                                    Lưu thay đổi
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>

                <div className="col-12 col-md-4">
                    <Fragment>
                        <div className="admin-create-product ra-giua item-in-cart wrapper my-5">
                            <img width="530px" src="https://res.cloudinary.com/hha-nlnganh/image/upload/v1618062042/Update-pana_yi6y6c.svg"></img>
                        </div>
                        
                    </Fragment>
                </div>
                
            </div>

        </Fragment>
    )
}

export default UpdateUser