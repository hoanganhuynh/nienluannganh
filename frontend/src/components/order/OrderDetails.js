import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'

import { useDispatch, useSelector } from 'react-redux'

import { getOrderDetails, clearErrors } from '../../actions/order.action'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const OrderDetails = ({ match }) => {

    const dispatch = useDispatch();

    //const { cartItems } = useSelector(state => state.cart)

    const { loading, error, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order

    useEffect(() => {
        dispatch(getOrderDetails(match.params.id));

        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, error, match.params.id])

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city.split('-')[0]}, ${shippingInfo.district.split('-')[0]}, ${shippingInfo.ward.split('-')[0]}`

    //const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (
        <Fragment>
            <MetaData title={'Order Details'} />

            {loading ? <Loader /> : (
                <Fragment>
                    <div className="gio-hang row d-flex justify-content-between">
                    
                        <div className="col-12 col-lg-12">
                            <span><a href='/orders/me' style={{color:'#ff6666'}}><span className="fa fa-chevron-left"></span> Đơn hàng </a>/ {order._id}</span>
                            <h2 className="gio-hang-tieu-de"><span className="fa fa-shopping-basket"></span> Đơn hàng của bạn</h2>
                            <h4 className="my-5">Order # {order._id}</h4>

                            {/* <h4 className="mb-4">Shipping Info</h4> */}
                            <h3 className="gio-hang-tieu-de">Thông tin giao hàng</h3>
                            <hr></hr>
                            <p><b>Tên người nhận hàng: </b> {user && user.name}</p>
                            <p><b>Số điện thoại: </b> {shippingInfo && shippingInfo.phoneNo}</p>
                            <p className="mb-4"><b>Địa chỉ nhận hàng: </b>{shippingDetails}</p>
                            <p><b>Tổng tiền: </b>{totalPrice} vnđ</p>
                            <hr />
                            <div className="row">
                                <div className="col-3 col-lg-2">
                                    <p className="cart-title-table text-center">Hình ảnh</p>
                                </div>

                                <div className="col-4 col-lg-3">
                                    <p className="cart-title-table text-center">Tên sản phẩm</p>
                                </div>

                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p className="cart-title-table text-center" id="card_item_price">Giá</p>
                                </div>

                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p className="cart-title-table text-center" id="card_item_price">Số lượng</p>
                                </div>

                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p className="cart-title-table text-center" id="card_item_price">Thành tiền</p>
                                </div>

                            </div>
                            <hr></hr>

                            {orderItems && orderItems.map(item => (
                                <Fragment>
                                    <div key={item.product} className="row my-5">
                                        <div className="col-3 col-lg-2">
                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                        </div>

                                        <div className="ra-giua col-4 col-lg-3">
                                            <Link className="text-center" to={`/products/${item.product}`}>{item.name}</Link>
                                        </div>

                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p className="text-center">{item.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p className="text-center">{item.quantity}</p>
                                        </div>

                                        <div className="ra-giua col-4 col-lg-2 mt-4 mt-lg-0">
                                            <b className="text-center">{item.price * item.quantity} vnđ</b>
                                        </div>
                                        
                                    </div>
                                    <hr></hr>
                                </Fragment>
                                ))}
                        </div>
                    </div>
                </Fragment>
            )}

        </Fragment>
    )
}

export default OrderDetails
