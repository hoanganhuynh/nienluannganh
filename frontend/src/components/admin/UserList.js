
import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable, MDBView } from 'mdbreact'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch, useSelector } from 'react-redux'
import { allUsers, deleteUser, clearErrors } from '../../actions/user.actions'
import { DELETE_USER_RESET } from '../../constants/user.constant'

const UsersList = ({ history }) => {

    const dispatch = useDispatch();

    const { loading, error, users } = useSelector(state => state.allUsers);
    const { isDeleted } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(allUsers());

        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }

        if (isDeleted) {
            toast.success('Đã xoá người dùng thành công !')
            history.push('/admin/users');
            dispatch({ type: DELETE_USER_RESET })
        }

    }, [dispatch, error, isDeleted, history])

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Created At',
                    field: 'createdAt',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                createdAt: user.createdAt,
                email: user.email,
                role: user.role,

                actions: <Fragment>
                    <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(user._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    let title = '';
    console.log(users);
    let total = users.length;
    if (total > 0) title = 'All users: ' + total.toString();
    else title = 'No user'

    return (
        <Fragment>
            <MetaData title={'All Users'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">{title}</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setUsers()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default UsersList