
import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

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

    console.log('user: ',users);

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
    let total = users.length;
    if (total > 0) title = 'Người dùng: ' + total.toString();
    else title = 'Không có người dùng'

    function nonAccentVietnamese(str) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
    }

    function doSearch() {
            document.getElementById('restoreTable').style.display= 'inline-block';
            let n = document.getElementById("noresults");

            let inputValue = document.getElementById("q").value;
            let khongDau = nonAccentVietnamese(inputValue).toLowerCase();
            console.log('nhap vao: ',khongDau);

            let rows = document.getElementsByClassName('value-name');
            let tableRow = document.getElementsByClassName('table-row');
            let on = 0;
            for ( let i = 0; i < rows.length; i++ ) {
                let nameProduct = rows[i].innerHTML.toLowerCase();
                let valueThisRow = nonAccentVietnamese(nameProduct);

                if ( valueThisRow ) {
                    if ( khongDau.length == 0 || valueThisRow.includes(khongDau) ){
                        console.log('Hien: ',valueThisRow)
                        rows[i].style.display = ""
                        tableRow[i+1].classList.remove('dNone');
                        on++;
                    } else {
                    rows[i].style.display = "none";
                    tableRow[i+1].classList.add('dNone');
                  }
                }
            }
            if ( on == 0 && n ) {
                n.style.display = "block";
                document.getElementById("qt").innerHTML = inputValue;
            } else {
                n.style.display = "none";
            }
    }

    function restoreTable() {
        document.getElementById("noresults").style.display = "none";;
        document.getElementById('restoreTable').style.display= 'none';
        let tableRow = document.getElementsByClassName('table-row');
        let rows = document.getElementsByClassName('value-name');
        document.getElementById('q').value = '';

        for(let i=0; i<rows.length;i++) {
            rows[i].style.display = "";
            tableRow[i].classList.remove('dNone');
            tableRow[rows.length].classList.remove('dNone');
        }
    }

    return (
        // <Fragment>
        //     <MetaData title={'Quản lý người dùng'} />
        //     <div className="row">
        //         <div className="col-12 col-md-2">
        //             <Sidebar />
        //         </div>

        //         <div className="col-12 col-md-10">
        //             <Fragment>
        //                 <h1 className="my-5">{title}</h1>

        //                 {loading ? <Loader /> : (
        //                     <MDBDataTable
        //                         data={setUsers()}
        //                         className="px-3"
        //                         bordered
        //                         striped
        //                         hover
        //                     />
        //                 )}

        //             </Fragment>
        //         </div>
        //     </div>

        // </Fragment>
        <Fragment>
            <MetaData title={'All Products'} />
            <div className="pRow row">
                <div className="pl-0 col-12 col-md-3">
                    <Sidebar />
                </div>

                <div className="dashboard col-12 col-md-9">
                    <div className='title-img'><img src='/images/admin/user.svg'></img></div>
                    <h1 className="db-title my-4">{title}<span></span></h1>
                    {/* <Link className="btn-add-new" to="/admin/product"><i className="mr-8 fa fa-plus"></i>Thêm mới sản phẩm</Link> */}
                    <form method='get' className='dFlex form-search item-in-cart' actions='/'>
                        {/* <span className="fa fa-search"></span> */}
                        <input placeholder='Địa chỉ email...'
                            className='search-input-table'
                            type="text"
                            name="q"
                            id="q"
                            // value=""
                            onKeyUp={doSearch}
                            >
                        </input>
                        <button id='restoreTable' type="button" onClick={restoreTable}>x</button>
                        <button id='doSearch' type="button" onClick={doSearch}><span className="fa fa-search"></span></button>
                    </form>
                    <ul className="table-admin">

                        <li className="table-row row item-in-cart ra-giua">
                            <div className="col-2 col-lg-1">
                                <p className="admin-title-table cart-title-table">Avatar</p>
                            </div>

                            <div className="col-2 col-lg-2">
                                <p className="admin-title-table cart-title-table">ID</p>
                            </div>

                            <div className="col-2 col-lg-2">
                                <p className="admin-title-table cart-title-table">Tên người dùng</p>
                            </div>

                            <div className="col-2 col-lg-2">
                                <p className="admin-title-table cart-title-table text-center">Vai trò</p>
                            </div>

                            <div className="col-2 col-lg-3">
                                <p className="admin-title-table cart-title-table text-center">Email</p>
                            </div>

                            <div className="col-2 col-lg-2">
                                <p className="admin-title-table cart-title-table text-center">Hành động</p>
                            </div>
                        </li>

                        {users && users.map(user => (
                            <li className="table-row row item-in-cart ra-giua">
                                <div className="col-2 col-lg-1">
                                    <img src={user && user.avatar && user.avatar.url} alt={user.name} width="40" height="40" />
                                </div>

                                <div className="col-2 col-lg-2">
                                    <p className="admin-title-table cart-title-table admin-row-color"><Link to={`/user/${user._id}`}>{user._id.length > 15 ? user._id.substring(0,15)+'...' : user._id}</Link></p>
                                </div>

                                <div className="col-2 col-lg-2">
                                    <p className="admin-title-table cart-title-table admin-row-color">{user.name}</p>
                                </div>

                                <div className="col-2 col-lg-2">
                                    <p className="admin-title-table cart-title-table text-center admin-row-color">{user.role}</p>
                                </div>

                                <div className="col-2 col-lg-3">
                                    <p className="value-name admin-title-table cart-title-table text-center admin-row-color">{user.email}</p>
                                </div>

                                <div className="ra-giua col-2 col-lg-2">
                                    {/* <p className="admin-title-table cart-title-table text-center admin-row-color">Hành động</p> */}
                                    {/* <i id="delete_cart_item" className="fa fa-trash btn" ></i> */}
                                    <Link to={`/admin/user/${user._id}`} className="ra-giua item-in-cart del-item-admin edit-item-admin">
                                        <i className="fa fa-pencil"></i>
                                    </Link>
                                    <button className="del-item-admin" onClick={() => deleteUserHandler(user._id)}>
                                        <i className="fa fa-trash"></i>
                                    </button>

                                </div>
                            </li>
                        ))}

                        <li className="table-row row item-in-cart" id="noresults" >
                            <div className="col-12 col-lg-12">
                                <p className="admin-null-table cart-title-table text-center">Không có dữ liệu với từ khoá "<span id="qt"></span>"</p>
                            </div>
                        </li>

                    </ul>
                    
                </div>
            </div>

        </Fragment>
    )
}

export default UsersList