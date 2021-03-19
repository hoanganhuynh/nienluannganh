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

            <CheckoutSteps shipping confirmOrder payment />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        


                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Pay {` - ${orderInfo && orderInfo.totalPrice}`}
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Payment
