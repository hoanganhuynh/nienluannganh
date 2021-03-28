import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'


const OrderSuccess = () => {
    return (
        <Fragment>

            <MetaData title={'Order Success'} />

            <section id="aa-myaccount">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="aa-myaccount-area">         
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="aa-myaccount-login">
                                            <h4>Đặt hàng thành công !</h4>
                                            
                                            <a className="aa-browse-btn" href="/orders/me" >Xem đơn hàng</a> 
                                            
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

export default OrderSuccess
