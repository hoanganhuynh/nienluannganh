import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import Step from './Step'


const OrderSuccess = () => {
    function checkStep() {
        let icon = ['fa', 'fa-check', 'active-step']
        for(let c=0;c<=4; c++) {
            document.getElementsByClassName("cricle-step")[c].classList.add(...icon);
            document.getElementsByClassName("num-step")[c].classList.add('dNone');
        } 
        for(let i=0;i<=4; i++) 
            document.getElementsByClassName("step-title")[i].classList.add("none-title");
    }
    setTimeout(() => {
        checkStep()
    },1000)


    return (
        <Fragment>

            <MetaData title={'Order Success'} />
            <input type="text" value='success' style={{display:'none'}} id="check-title"></input>
            <Step />

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
                                            <img width="600px" src="https://res.cloudinary.com/hha-nlnganh/image/upload/v1616936595/dat_hang_thanh_cong_jten6g.png" alt="shipping image"></img>
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
