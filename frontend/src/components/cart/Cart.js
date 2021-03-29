import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import MetaData from '../layouts/MetaData'

import Step from './Step'

import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, removeItemFromCart } from '../../actions/cart.action'


const Cart = ({ history }) => {

    const dispatch = useDispatch();

    const { cartItems } = useSelector(state => state.cart)


    const removeCartItemHandler = (id) => {
        toast.success('Xoá sản phẩm khỏi giỏ hàng thành công !')
        dispatch(removeItemFromCart(id))
    }

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;

        if (newQty > stock) {
            toast.error('Sản phẩm vượt quá mức cho phép !')
            return;
        }

        dispatch(addItemToCart(id, newQty))
    }

    const decreaseQty = (id, quantity) => {

        const newQty = quantity - 1;

        if (newQty <= 0) {
            toast.error('Sản phẩm muốn mua phải tối thiếu 1 sản phẩm !')
            return;
        }
        dispatch(addItemToCart(id, newQty))
    }

    let tongcong = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)



    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    function checkStep() {
        let classesToAdd = ['gray-title', 'none-title']        
        document.getElementsByClassName("cricle-step")[0].classList.add("active-step");
        document.getElementsByClassName("step-title")[0].classList.add("active-title");
        document.getElementsByClassName("cricle-step")[0].classList.add("animation-pulse");
        for(let i=1;i<=4;i++) 
            document.getElementsByClassName("step-title")[i].classList.add(...classesToAdd);
        for(let j=0;j<=3;j++) 
            document.getElementsByClassName("step-image")[j].classList.add('gray-image');
        }
    setTimeout(() => {
        checkStep()
    },400)
    

    return (
        <Fragment>
            <MetaData title={'Giỏ hàng của bạn'} />
            <input type="text" value='cart' style={{display:'none'}} id="check-title"></input>
            {cartItems.length === 0 ? <h2 className="mt-5">Chưa có sản phẩm nào !</h2> : (
                
                <Fragment>
                    
                    <Step />
                    
                    <hr></hr>
                    
                    <div className="gio-hang row d-flex justify-content-between">
                        <div style={{borderRight:"1px solid #eaeaea"}} className="col-12 col-lg-8">
                        
                        
                        {/* <spann><a href='/cart' style={{color:'#ff6666'}}><span className="fa fa-chevron-left"></span> Giỏ hàng </a>/ Thông tin giao hàng</spann> */}

                            <h2 className="gio-hang-tieu-de"><span className="fa fa-shopping-basket"></span>  Giỏ hàng của bạn: <b>{cartItems.length}</b></h2>
                            <hr></hr>
                            <div className="row item-in-cart">
                                <div className="col-4 col-lg-3">
                                    <p className="cart-title-table text-center">Hình ảnh</p>
                                </div>

                                <div className="col-4 col-lg-3">
                                    <p className="cart-title-table text-center">Tên sản phẩm</p>
                                </div>
                                <div className="col-3 col-lg-2 mt-4 mt-lg-0">
                                    <p className="cart-title-table text-center" id="card_item_price">Kho</p>
                                </div>

                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p className="cart-title-table text-center" id="card_item_price">Giá</p>
                                </div>

                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p className="cart-title-table text-center" id="card_item_price">Số lượng</p>
                                </div>

                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p className="cart-title-table text-center" id="card_item_price">Hành động</p>
                                </div>

                            </div>
                            <hr></hr>
                            {cartItems.map(item => (
                                <Fragment>
                                    <div className="cart-item" key={item.product}>

                    

                                        <div className="row item-in-cart">
                                            <div className="col-4 col-lg-3">
                                                <img src={item.image} alt="Laptop" height="90" width="115" />
                                            </div>

                                            <div className="ra-giua col-5 col-lg-3">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div className="col-3 col-lg-2 mt-4 mt-lg-0">
                                                <p className="text-center" id="card_item_price">{item.stock}</p>
                                            </div>

                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p className="text-center" id="card_item_price">{item.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</p>
                                            </div>

                                            <div className="ra-giua col-4 col-lg-2 mt-4 mt-lg-0">
                                                <div className="tang-giam stockCounter d-inline">
                                                    <span className="giam-sl btn" onClick={() => decreaseQty(item.product, item.quantity)}>-</span>

                                                    <input type="number" className="so-luong form-control count d-inline" value={item.quantity} readOnly />

                                                    {item.quantity > item.stock ? 
                                                        (<span disabled className="tang-sl btn" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>)
                                        
                                                    : (<span className="tang-sl btn" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>)
                                                    }

                                                    
                                                </div>
                                            </div>

                                            <div className="ra-giua col-4 col-lg-2 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" className="fa fa-trash btn" onClick={() => removeCartItemHandler(item.product)} ></i>
                                            </div>

                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            ))}

                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h2 className="gio-hang-tieu-de"><span className="fa fa-file-text"></span> Hoá đơn</h2>
                                <hr />
                                <p>Tổng số lượng:  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (cái)</span></p>
                                <p>Tổng cộng: <span className="order-summary-values">{tongcong.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} vnđ</span></p>
                                                        
                                <button id="checkout_btn" className="aa-browse-btn" onClick={checkoutHandler}>Tiếp tục</button>
                            </div>
                            
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Cart