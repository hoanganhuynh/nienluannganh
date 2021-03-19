import React, { Fragment, useState, useEffect } from 'react'
//import { countries } from 'countries-list'

import MetaData from '../layouts/MetaData'
import CheckoutSteps from './CheckoutSteps'

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
    return (
        <Fragment>

            <MetaData title={'Shipping Info'} />

            <CheckoutSteps shipping />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
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
                            <label htmlFor="city_field">City</label>
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
                            <label htmlFor="postal_code_field">District</label>
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
                            <label htmlFor="country_field">Country</label>
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
                            <label htmlFor="phone_field">Phone No</label>
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
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Shipping