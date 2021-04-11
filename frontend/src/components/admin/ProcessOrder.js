import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, updateOrder, clearErrors } from '../../actions/order.action'
import { UPDATE_ORDER_RESET } from '../../constants/order.constant'

const ProcessOrder = ({ match }) => {

    const [status, setStatus] = useState('');

    const dispatch = useDispatch();

    const { loading, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
    const { error, isUpdated } = useSelector(state => state.order)

    console.log(orderItems);

    // console.log(order);

    const orderId = match.params.id;

    useEffect(() => {

        dispatch(getOrderDetails(orderId))

        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }


        if (isUpdated) {
            toast.success('Đơn hàng đã được cập nhật !')
            dispatch({ type: UPDATE_ORDER_RESET })
        }

    }, [dispatch, error, isUpdated, orderId])


    const updateOrderHandler = (id) => {

        const formData = new FormData();
        formData.set('status', status);

        dispatch(updateOrder(id, formData))
    }

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city.split('-')[0]}, ${shippingInfo.district.split('-')[0]}, ${shippingInfo.ward.split('-')[0]}`
    // const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false
    
    
    return (
        <Fragment>
            <MetaData title={`Process Order # ${order && order._id}`} />
            <div className="pRow row">
                <div className="col-12 col-md-3 pl-0">
                    <Sidebar />
                </div>

                <div className="dashboard col-12 col-md-9">

                    <div className='title-img'><img src='/images/admin/computer.svg'></img></div>
                    <h1 className="db-title my-4">Chi tiết đơn hàng<span></span></h1>

                    <div className="process-order-admin item-in-cart">
                        <select
                            className="form-control select-order-admin"
                            name='status'
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Đăng xử lý">Đang xử lý</option>
                            <option value="Đã nhận hàng">Đã nhận hàng</option>
                        </select>
                        
                        <button className="aa-browse-btn aa-browse-btn-admin order-update" onClick={() => updateOrderHandler(order._id)}>
                            Cập nhật trạng thái
                        </button>
                    </div> 

                    <h2 className="title-admin-order">#{order._id}<span></span></h2>  

                    <div className="shipping-info">
                        {/* <h2 className="my-5">Order # {order._id}</h2> */}

                        {/* <h4 className="mb-4">Shipping Info</h4> */}
                        <p><b>Tên người mua hàng:</b> {user && user.name}</p>
                        <p><b>Email:</b> {user && user.email}</p>
                        <p><b>Số điện thoại:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                        <p className="mb-4"><b>Địa chỉ: </b>{shippingDetails}</p>
                        <p><b>Tổng tiền:</b> {totalPrice && totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} vnđ</p>
                        <p>Trạng thái: <span className={order.orderStatus && String(order.orderStatus).includes('Đã nhận hàng') ? "greenColor" : "redColor"} >{orderStatus}</span></p>
                        
                    </div> 

                    <ul style={{overflow:'scroll', height:'30vh'}} className="table-admin">

                        <li className="table-row row item-in-cart ra-giua">
                            <div className="col-2 col-lg-2">
                                <p className="admin-title-table cart-title-table">Hình ảnh</p>
                            </div>

                            <div className="col-2 col-lg-3">
                                <p className="admin-title-table cart-title-table">ID</p>
                            </div>

                            <div className="col-2 col-lg-2">
                                <p className="admin-title-table cart-title-table">Tên sản phẩm</p>
                            </div>

                            <div className="col-2 col-lg-2">
                                <p className="admin-title-table cart-title-table text-center">Giá</p>
                            </div>

                            <div className="col-2 col-lg-2">
                                <p className="admin-title-table cart-title-table text-center">Số lượng</p>
                            </div>

                            <div className="col-2 col-lg-2">
                                <p className="admin-title-table cart-title-table text-center">Thành tiền</p>
                            </div>
                        </li>
                        {orderItems && orderItems.map(item => (
                            <li className="table-row row item-in-cart ra-giua">
                                <div style={{paddingLeft:'10px'}} className="admin-cell-img col-2 col-lg-2">
                                    <img src={item && item.image} alt={item && item.name} width="60" />
                                </div>

                                <div className="col-2 col-lg-3">
                                    <p className="admin-title-table cart-title-table admin-row-color">{item._id.length > 15 ? item._id.substring(0,20)+'...' : item._id}</p>
                                </div>

                                <div className="col-2 col-lg-2">
                                    <p className="admin-title-table cart-title-table admin-row-color">{item && item.name}</p>
                                </div>

                                <div className="col-2 col-lg-2">
                                    <p className="admin-title-table cart-title-table text-center admin-row-color">{item.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} đ</p>
                                </div>

                                <div className="col-2 col-lg-2">
                                    <p className="admin-title-table cart-title-table text-center admin-row-color">{item.quantity}</p>
                                </div>

                                <div className="col-2 col-lg-2">
                                    <p className="admin-title-table cart-title-table text-center admin-row-color">{(item.quantity * item.price).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} đ</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </Fragment>
    )
}

export default ProcessOrder