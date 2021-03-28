import React, { Fragment, useState, useEffect } from 'react'
//import { countries } from 'countries-list'

import MetaData from '../layouts/MetaData'
import CheckoutSteps from './CheckoutSteps'

import Step from './Step'

import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../actions/cart.action'


import data from './data.json';

const Shipping = ({ history }) => {

    const { shippingInfo } = useSelector(state => state.cart)
    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState("Thành phố Cần Thơ-92")
    const [district, setDistrict] = useState("Quận Ninh Kiều-916")
    const [ward, setWard] = useState("Phường Xuân Khánh-31144")
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [selectedDistrict, setSelectedDistrict] = useState([]);

    const [selectedWard, setSelectedWard] = useState([]);

    const handleChangeCity = (e) => {
        
        setCity(e.target.value);
    }
    
    useEffect(() => {
        const [, id] = city.split('-');
        //console.log("City id: " +id)
        const findCity = data.find(item => item.Id === id);
        if (findCity) {
            setSelectedDistrict(findCity.Districts);
        }
    }, [city])
    
    useEffect(() => {
        const [, id] = district.split('-');
        //console.log(district)
        //console.log("District id: " + id)
        const findWards = selectedDistrict.find(item => item.Id == id)
        // console.log(findWards)
        if (findWards) { 
            setSelectedWard(findWards.Wards);
        }
    }, [selectedDistrict, district])
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingInfo({ address, city, phoneNo, district, ward }))
        history.push('/orders/confirm')
    }
    
    function checkStep() {
        let classesToAdd = ['gray-title', 'none-title']
        let icon = ['fa', 'fa-check', 'active-step']
        document.getElementsByClassName("cricle-step")[0].classList.add(...icon);
        document.getElementsByClassName("num-step")[0].classList.add('dNone');
        for(let c = 0; c <= 1; c++) {
            document.getElementsByClassName("cricle-step")[c].classList.add('active-step');
            document.getElementsByClassName("step-title")[c].classList.add("active-title");
        }
        for(let i=2;i<=4;i++) 
            document.getElementsByClassName("step-title")[i].classList.add(...classesToAdd);
        for(let j=1;j<=3;j++) 
            document.getElementsByClassName("step-image")[j].classList.add('gray-image');
    }
    setTimeout(() => {
        checkStep()
    },1000)

    return (
        <Fragment>

            <MetaData title={'Shipping Info'} />
            <input type="text" value='shipping' style={{display:'none'}} id="check-title"></input>
            <Step />
            <div className="gio-hang row d-flex justify-content-between">
                <div className="col-12 col-lg-12">
                    {/* <span><a href='/cart' style={{color:'#ff6666'}}><span className="fa fa-chevron-left"></span> Giỏ hàng </a>/ Thông tin giao hàng</span> */}

                <section id="aa-myaccount">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="aa-myaccount-area">         
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="aa-myaccount-login">
                                                <h4>Thông tin giao hàng</h4>

                                                {/* <form onSubmit={submitHandler} className="aa-login-form">
                                                    <label for="">Địa chỉ email<span>*</span></label>
                                                    <input 
                                                        type="email"
                                                        id="email_field"
                                                        className="form-control"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}>
                                                    </input>
                                                    <label for="">Mật khẩu<span>*</span></label>
                                                    <input
                                                        type="password"
                                                        id="password_field"
                                                        className="form-control"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}>
                                                    </input>
                                                    <button type="submit" className="aa-browse-btn">Đăng nhập</button>
                                                    <br></br>
                                                    <br></br>
                                                    <p className="aa-lost-password"><a href="/password/forgot">Quên mật khẩu?</a></p>
                                                    <p className="aa-lost-password"><a href="/register">Đăng ký</a></p>
                                                </form> */}

                                                {/* FROM */}

                                                <form className="aa-login-form" onSubmit={submitHandler}>
                                                    {/* <h1 className="mb-4">Shipping Info</h1> */}
                                                    {/* <label for="">Thông tin giao hàng<span>*</span></label> */}
                                                    <div className="form-group">
                                                        {/* <label htmlFor="address_field">Address</label> */}
                                                        <label htmlFor="address_field">Địa chỉ <span>*</span></label>
                                                        <input
                                                            type="text"
                                                            id="address_field"
                                                            className="form-control"
                                                            value={address}
                                                            onChange={(e) => setAddress(e.target.value)}
                                                            required
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="city_field">Thành phố <span>*</span></label>
                                                        <select
                                                            id="city_field"
                                                            className="form-control"
                                                            value={city}
                                                            onChange={handleChangeCity}
                                                            required
                                                        >
                                                            
                                                            {data.map(city => (
                                                                <option key={city.Name} value={city.Name + '-' + city.Id}>
                                                                    {city.Name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="postal_code_field">Quận / Huyện <span>*</span></label>
                                                        <select
                                                            id="postal_code_field"
                                                            className="form-control"
                                                            value={district}
                                                            onChange={(e) => setDistrict(e.target.value)}
                                                            required
                                                        >
                                                            
                                                            {selectedDistrict && selectedDistrict.length && selectedDistrict.map(item => (
                                                                <option key={item.Id} value={item.Name + "-" + item.Id }>
                                                                    {item.Name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="country_field">Phường / Xã <span>*</span></label>
                                                        <select
                                                            id="country_field"
                                                            className="form-control"
                                                            value={ward}
                                                            onChange={(e) => setWard(e.target.value)}
                                                            required
                                                        >

                                                            { selectedWard && selectedWard.length && selectedWard.map(item => (
                                                                <option key={item.Id} value={item.Name  + "-" + item.Id}>
                                                                    {item.Name}
                                                                </option>
                                                            ))}

                                                        </select>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="phone_field">Số điện thoại <span>*</span></label>
                                                        <input
                                                            type="phone"
                                                            id="phone_field"
                                                            className="form-control"
                                                            value={phoneNo}
                                                            onChange={(e) => setPhoneNo(e.target.value)}
                                                            required
                                                        />
                                                    </div>

                                                    <button
                                                        id="shipping_btn"
                                                        // type="submit"
                                                        // className="btn btn-block py-3"
                                                        type="submit" className="aa-browse-btn"
                                                    >
                                                        Tiếp tục
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
            </div>
            </div>

        </Fragment>
    )
}

export default Shipping