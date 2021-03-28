import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layouts/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { useSelector } from 'react-redux'

const ConfirmOrder = ({ history }) => {

    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    // Calculate Order Prices
    const itemsPrice = Number(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0))
    const shippingPrice = itemsPrice > 50000 ? 0 : 20000
    const totalPrice = Number((itemsPrice + shippingPrice).toFixed(2))

    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            totalPrice,
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        history.push('/payment')
    }

    return (
        <Fragment>

            <MetaData title={'Confirm Order'} />

            {/* <CheckoutSteps shipping confirmOrder /> */}

            <div className="gio-hang row d-flex justify-content-between">
                <div style={{borderRight:"1px solid #eaeaea"}} className="col-12 col-lg-8 order-confirm">

                    <h2 className="gio-hang-tieu-de"><span className="fa fa-shopping-basket"></span>  Thông tin giao hàng</h2>

                    <p><b>Tên khách hàng:</b> {user && user.name}</p>
                    <p><b>Số điện thoại:</b> {shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b>Địa chỉ giao hàng:</b> {`${shippingInfo.address}, ${shippingInfo.city.split('-')[0]}, ${shippingInfo.district.split('-')[0]}, ${shippingInfo.ward.split('-')[0]}`}</p>
                    <h3 className="gio-hang-tieu-de">Sản phẩm ({cartItems.length})</h3>

                    <hr />
                    {/* <h4 className="mt-4">Your Cart Items:</h4> */}
                    <div className="row">
                        <div className="col-4 col-lg-3">
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

                    {cartItems.map(item => (
                        <Fragment>
                            <hr />
                            <div className="cart-item my-1" key={item.product}>
                                <div className="row">
                                    <div className="ra-giua col-4 col-lg-3">
                                        <img src={item.image} alt="Laptop" height="45" width="65" />
                                    </div>

                                    <div className="ra-giua col-4 col-lg-3">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>

                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p className="text-center" id="card_item_price">{item.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} đ</p>
                                    </div>

                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p className="text-center" id="card_item_price">{item.quantity} cái</p>
                                    </div>

                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p className="text-center" id="card_item_price">{(item.quantity * item.price).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} đ</p>
                                    </div>

                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}



                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h2 className="gio-hang-tieu-de"><span className="fa fa-file-text"></span> Xác nhận hoá đơn</h2>
                        <hr />
                        <p>Tổng tiền:  <span className="order-summary-values">{itemsPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} vnđ</span></p>
                        {shippingPrice ? <p>Phí giao hàng: <span className="order-summary-values">{shippingPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} vnđ</span></p> : <p>Phí giao hàng: <span className="order-summary-values">Miễn phí</span></p>}
                        

                        <hr />

                        <p style={{color: '#ff6666'}}>Tổng cộng: <strong className="order-summary-values">{totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} vnđ</strong></p>

                        <hr />
                        <button id="checkout_btn" className="aa-browse-btn" onClick={processToPayment}>Tiến hành đặt hàng</button>
                    </div>
                </div>


            </div>

        </Fragment>
    )
}

export default ConfirmOrder