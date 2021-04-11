import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'

import Moment from 'react-moment';
import 'moment-timezone';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import { useDispatch, useSelector } from 'react-redux'
import { allOrders, deleteOrder, clearErrors } from '../../actions/order.action'
import { DELETE_ORDER_RESET } from '../../constants/order.constant'

const OrdersList = ({ history }) => {

    
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector(state => state.order)

    console.log('hi',orders)

    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }

        if (isDeleted) {
            toast.success('Đơn hàng đã xoá thành công !')
            history.push('/admin/orders');
            dispatch({ type: DELETE_ORDER_RESET })
        }

    }, [dispatch, error, isDeleted, history])

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'No of Items',
                    field: 'numofItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        // orders.forEach(order => {
        //     data.rows.push({
        //         id: order._id,
        //         numofItems: order.orderItems.length,
        //         amount: `$${order.totalPrice}`,
        //         status: order.orderStatus && String(order.orderStatus).includes('Đã nhận hàng')
        //             ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
        //             : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
        //         actions: <Fragment>
        //             <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
        //                 <i className="fa fa-eye"></i>
        //             </Link>
        //             <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
        //                 <i className="fa fa-trash"></i>
        //             </button>
        //         </Fragment>
        //     })
        // })

        return data;
    }

    let title = '';
    let totalOrder = orders?.length;
    console.log(orders);
    if (totalOrder > 0) title = 'Đơn đặt hàng: ' + totalOrder.toString();
    else title = 'Không có đơn hàng'

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

    function getNameProd(x) {
        let nameCol = ''
        x.orderItems.map(item => {
            nameCol+=item.name+', '
        })
        let res = nameCol.substring(0, nameCol.length-2)
        if(res.length > 20)
            return res.substring(0,20)+'...'
        else return res
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
        <Fragment>
            <MetaData title={'All Orders'} />
            <div className="pRow row">
                <div className="col-12 col-md-3 pl-0">
                    <Sidebar />
                </div>

                <div className="dashboard col-12 col-md-9">
                    <div className='title-img'><img src='/images/admin/computer.svg'></img></div>
                    <h1 className="db-title my-4">{title}<span></span></h1>
                    {/* <Link className="btn-add-new" to="/admin/product"><i className="mr-8 fa fa-plus"></i>Thêm mới sản phẩm</Link> */}
                    <form method='get' className='dFlex form-search item-in-cart' actions='/'>
                        {/* <span className="fa fa-search"></span> */}
                        <input placeholder='ID đơn hàng...'
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

                    <ul style={{overflow:'scroll', height:'70vh'}} className="table-admin">
                        <li className="table-row row item-in-cart ra-giua">
                            <div className="col-2 col-lg-2">
                                <p className="admin-title-table cart-title-table">ID</p>
                            </div>

                            <div className="col-2 col-lg-3">
                                <p className="admin-title-table cart-title-table">Sản phẩm</p>
                            </div>

                            <div className="col-2 col-lg-1">
                                <p className="admin-title-table cart-title-table">Số lượng</p>
                            </div>

                            <div className="col-2 col-lg-2">
                                <p className="admin-title-table cart-title-table">Ngày đặt</p>
                            </div>

                            <div className="col-2 col-lg-2">
                                <p className="admin-title-table cart-title-table text-center">Tổng tiền</p>
                            </div>

                            <div className="col-2 col-lg-2">
                                <p className="admin-title-table cart-title-table text-center">Trạng thái</p>
                            </div>

                            <div className="col-2 col-lg-2">
                                <p className="admin-title-table cart-title-table text-center">Hành động</p>
                            </div>
                        </li>

                        {orders && orders.length == 0 ? (
                        <li className="row item-in-cart ra-giua">
                            <div className="col-12 col-lg-12">
                                <p className="admin-null-table cart-title-table text-center">Chưa có dữ liệu</p>
                            </div>
                        </li>
                        ):('')}
                        
                    

                        {orders && orders.map(order => (
                            <li className="table-row row item-in-cart ra-giua">
                                <div className="col-2 col-lg-2">
                                    <p className="value-name admin-title-table cart-title-table admin-row-color">{order._id.length > 10 ? order._id.substring(0,10)+'...' : order._id}</p>
                                </div>

                                <div className="col-2 col-lg-3">
                                    <p className="admin-title-table cart-title-table admin-row-color">{getNameProd(order)}</p>
                                </div>

                                <div className="col-2 col-lg-1">
                                    <p className="admin-title-table cart-title-table admin-row-color">{order && order.orderItems  && order.orderItems.length}</p>
                                </div>

                                <div className="col-2 col-lg-2">
                                    <p className="admin-title-table cart-title-table admin-row-color"><Moment format="hh:mm:ss - DD/MM/YYYY">{order.createdAt}</Moment></p>
                                </div>

                                <div className="col-2 col-lg-2">
                                    <p className="admin-title-table cart-title-table text-center admin-row-color">{order.totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} đ</p>
                                </div>

                                
                                
                                {order && String(order.orderStatus).includes('Đã nhận hàng') ? 
                                (
                                    <div className="col-2 col-lg-2">
                                        <p style={{color: 'green'}} className="admin-title-table cart-title-table text-center admin-row-color">{order.orderStatus}</p>
                                    </div>
                                )
                                :
                                (
                                    <div className="col-2 col-lg-2">
                                        <p style={{color: 'orange'}} className="admin-title-table cart-title-table text-center admin-row-color">{order.orderStatus}</p>
                                    </div>
                                )}
                                
                                <div className="ra-giua col-2 col-lg-2">
                                    {/* <p className="admin-title-table cart-title-table text-center admin-row-color">Hành động</p> */}
                                    {/* <i id="delete_cart_item" className="fa fa-trash btn" ></i> */}
                                    <Link to={`/admin/order/${order._id}`} className="ra-giua item-in-cart del-item-admin edit-item-admin">
                                        <i className="fa fa-eye"></i>
                                    </Link>
                                    <button className="del-item-admin" onClick={() => deleteOrderHandler(order._id)}>
                                        <i className="fa fa-trash"></i>
                                    </button>

                                </div>
                            </li>

                            
                        ))}

                        <li className="row item-in-cart" id="noresults" >
                            <div className="col-12 col-lg-12">
                                <p className="admin-null-table cart-title-table text-center">Không có dữ liệu với từ khoá "<span id="qt"></span>"</p>
                            </div>
                        </li>

                        

                        
                    </ul>
                    {/* <Fragment>
                        <h1 className="my-5">{title}</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setOrders()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment> */}

                </div>
            </div>

        </Fragment>
    )
}

export default OrdersList
