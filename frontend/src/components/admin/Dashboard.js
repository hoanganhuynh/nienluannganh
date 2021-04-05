import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'

import { getAdminProducts } from '../../actions/product.actions'
import { allOrders } from '../../actions/order.action'
import { allUsers, getUserDetails } from '../../actions/user.actions'

const Dashboard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders)

    // console.log('orders: ',products);



    let outOfStock = 0;
    products?.forEach(product => {
        if (product?.stock === 0) {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())
    }, [dispatch])

    let allTotalQty = 0;
    // let 
    orders && orders.map(order => {
        if(order.orderStatus == 'Đã nhận hàng') {
            let a = order.orderItems.reduce((total, item) => total + item.quantity, 0)
            allTotalQty+=a
        }
    })


    // let getAllQtyProduct = {}
    // orders && orders.map(order => {
    //     if(order.orderStatus == 'Đã nhận hàng') {
    //         order.orderItems.map(product => {
    //             getAllQtyProduct[product.quantity] = {
    //                 quantity: product.quantity,
    //                 name: product.name,
    //                 id: product.product,
    //                 url: product.image
    //             }
    //         })
    //     }
    // })
    // let getMaxQty = getAllQtyProduct[Object.keys(getAllQtyProduct).pop()]

    // console.log(getMaxQty);

    function count(array) {
        const resultArray = [];
        array && array.forEach(element => {
          if(element.orderItems && element.orderItems.length) {
            const orderItems = element.orderItems;
            orderItems.forEach(orderItem => {
              const foundItemIdx = resultArray.findIndex(e => {
                if (!e || !e.product) return -1;
                return e.product === orderItem.product;
              });
      
              if(foundItemIdx !== -1) {
                resultArray[foundItemIdx].quantity += orderItem.quantity;
              } else {
                resultArray.push({
                  product: orderItem.product,
                  quantity: orderItem.quantity,
                  name: orderItem.name,
                  image: orderItem.image
                })
              }   
            });
          }
        });
        return resultArray;
      }

    let maxObj = count(orders).reduce((max, obj) => (max.quantity > obj.quantity) ? max : obj, 0);
    let minObj = count(orders).reduce((min, obj) => (min.quantity < obj.quantity) ? min : obj, 0);
    // console.log(maxObj)


    
    let orderShipped = 0;
    orders && orders.map(order => {
        if(order.orderStatus == 'Đã nhận hàng') {
            orderShipped+=1
        }
    })

    return (
        
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="dashboard col-12 col-md-10">
                    <div className='title-img'><img src='/images/admin/switch.svg'></img></div>
                    <h1 className="db-title my-4">Dashboard</h1>
                    {loading ? <Loader /> : (
                        <Fragment>
                            <MetaData title={'Admin Dashboard'} />

                            <div style={{margin:'30px 0 20px 0'}} className="row pr-4">
                                <div className="col-xl-12 col-sm-6 mb-3">
                                    <div>
                                        <div className="item-db card-body">
                                            <div className="card-font-size">Doanh thu<br /> <b>{totalAmount && totalAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} vnd</b>
                                            </div>
                                            <img src='/images/admin/dollar.svg'></img>
                                        </div>
                                    </div>
                                </div>
                            

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div>
                                        <div className="item-db card-body">
                                            <div className="card-font-size"><a>Người dùng</a><br /> <b>{users && users.length}</b></div>
                                            <img src='/images/admin/man.svg'></img>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div style={{margin:'10px 0 20px 0'}} className="row pr-4">
                                <div className="col-xl-3 col-sm-4 mb-3">
                                    <div>
                                        <div className="item-db card-body">
                                            <div className="card-font-size"><a href='/admin/orders'>Tổng đơn hàng</a><br /> <b>{orders && orders.length}</b>
                                            </div>
                                            <img src='/images/admin/price-list.svg'></img>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-4 mb-3">
                                    <div>
                                        <div className="item-db card-body">
                                            <div className="card-font-size"><a>Đơn hàng thành công</a><br /> <b>{orderShipped}</b></div>
                                            <img src='/images/admin/received.svg'></img>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-4 mb-3">
                                    <div>
                                        <div className="item-db card-body">
                                            <div className="card-font-size"><a>Đơn hàng đang xử lý</a><br /> <b>{orders.length - orderShipped}</b></div>
                                            <img src='/images/admin/delivery-truck.svg'></img>
                                        </div>
                                    </div>
                                </div>

                                
                            </div>
                            <div style={{margin:'30px 0 20px 0'}} className="row pr-4">

                                <div className="col-xl-3 col-sm-4 mb-3">
                                    <div>
                                        <div className="item-db card-body">
                                            <div className="card-font-size"><a href='/admin/products'>Tổng sản phẩm</a><br /> <b>{products && products.length}</b></div>
                                            <img src='/images/admin/ipad.svg'></img>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-4 mb-3">
                                    <div>
                                        <div className="item-db card-body">
                                            <div className="card-font-size">Số sản phẩm hết hàng<br /> <b>{outOfStock}</b></div>
                                            <img src='/images/admin/open.svg'></img>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-4 mb-3">
                                    <div>
                                        <div className="item-db card-body">
                                            <div className="card-font-size">Tổng sản phẩm đã bán<br /> <b>{allTotalQty}</b></div>
                                            <img src='/images/admin/commission.svg'></img>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div style={{margin:'30px 0 20px 0'}} className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div>
                                        <div className="item-db card-body">
                                            <div className="card-font-size">Sản phẩm được mua nhiều nhất<br /><Link className='maxProduct' to={`/product/${maxObj.product}`}>{maxObj.name}</Link></div>
                                            <div className="card-font-size">Số lượng<br /> <b>{maxObj.quantity}</b></div>
                                            
                                            <img src={maxObj.image}></img>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div>
                                        <div className="item-db card-body">
                                            <div className="card-font-size">Sản phẩm được mua ít nhất<br /><Link className='maxProduct' to={`/product/${minObj.product}`}>{minObj.name.length > 15 ? minObj.name.substring(0,14)+'...' : minObj.name}</Link></div>
                                            <div className="card-font-size">Số lượng<br /> <b>{minObj.quantity}</b></div>
                                            
                                            <img src={minObj.image}></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )}

                </div>
            </div>
        
        </Fragment >
    )
}

export default Dashboard