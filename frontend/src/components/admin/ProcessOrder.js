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
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        {loading ? <Loader /> : (
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-7 order-details">

                                    <h2 className="my-5">Order # {order._id}</h2>

                                    <h4 className="mb-4">Shipping Info</h4>
                                    <p><b>Name:</b> {user && user.name}</p>
                                    <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                                    <p className="mb-4"><b>Address:</b>{shippingDetails}</p>
                                    <p><b>Amount:</b> ${totalPrice}</p>

                                    <hr />

                                    {/* <h4 className="my-4">Payment</h4>
                                    <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p> */}


                                    <h4 className="my-4">Order Status:</h4>
                                    <p className={order.orderStatus && String(order.orderStatus).includes('Đã nhận hàng') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>



                                    <h4 className="my-4">Order Items:</h4>

                                    <hr />
                                    <div className="cart-item my-1">
                                        {orderItems && orderItems.map(item => (
                                            <div key={item.product} className="row my-5">
                                                <div className="col-4 col-lg-2">
                                                    <img src={item.image} alt={item.name} height="45" width="65" />
                                                </div>

                                                <div className="col-5 col-lg-5">
                                                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                </div>


                                                <div className="col-5 ">
                                                    <p>${item.price}</p>
                                                    <p>{item.quantity} x ${item.price} = <b>${(item.quantity * item.price).toFixed(2)}</b></p>
                                                </div>

                                                {/* <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <p>{item.quantity} Piece(s)</p>
                                                </div> */}
                                            </div>
                                        ))}
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Status</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Đăng xử lý">Đang xử lý</option>
                                            <option value="Đã giao">Đã giao</option>
                                            <option value="Đã nhận hàng">Đã nhận hàng</option>
                                        </select>
                                    </div>

                                    <button className="btn btn-primary btn-block" onClick={() => updateOrderHandler(order._id)}>
                                        Update Status
                                    </button>
                                </div>

                            </div>
                        )}
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ProcessOrder