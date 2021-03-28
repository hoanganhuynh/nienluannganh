import React, { Fragment, useEffect } from 'react'

import MetaData from '../layouts/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../actions/order.action'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'

import axios from 'axios'

// const options = {
//     style: {
//         base: {
//             fontSize: '16px'
//         },
//         invalid: {
//             color: '#9e2146'
//         }
//     }
// }

const Payment = ({ history }) => {

    //const alert = useAlert();
    //onst stripe = useStripe();
    //const elements = useElements();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.newOrder)

    useEffect(() => {

        if (error) {
            //toast.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, error])

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        //document.querySelector('#pay_btn').disabled = true;

        let res;
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        res = await axios.post('/api/v1/payment/process', paymentData, config)

        const result = {
            name: user.name,
            email: user.email
        }
        if(result.error) {
            toast.error('Loi')
        }
        // order.paymentInfo = {
        //     id: result.paymentIntent.id,
        //     status: result.paymentIntent.status
        // }
        dispatch(createOrder(order))
        history.push('/success')
        
    }

    return (
        <Fragment>
            <MetaData title={'Payment'} />

            {/* <CheckoutSteps shipping confirmOrder payment /> */}

            <section id="aa-myaccount">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="aa-myaccount-area">         
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="aa-myaccount-login">
                                            <h4>Xác nhận đặt hàng</h4>
                                            <p>Vui lòng chuẩn bị số tiền <strong>{orderInfo && orderInfo.totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} vnđ</strong> khi nhận hàng</p>
                                            <p></p>
                                            <form lassName="aa-login-form" onSubmit={submitHandler}>
                                                <button
                                                    id="pay_btn"
                                                    type="submit"
                                                    className="aa-browse-btn"
                                                >
                                                    Xác nhận
                                                </button>
                                            </form> 
                                            
                                        </div>
                                    </div>

                                    <div className="col-md-7">
                                        <div className="aa-myaccount-register">                 
                                            <img width="600px" src="https://res.cloudinary.com/hha-nlnganh/image/upload/v1616907492/giao_hang_ihfaxt.png" alt="shipping image"></img>
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

export default Payment
