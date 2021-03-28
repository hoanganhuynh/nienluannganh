import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { myOrders, clearErrors, deleteOrder, allOrders } from '../../actions/order.action'


const ListOrders = () => {


    const dispatch = useDispatch();

     const {loading,error,orders}  = useSelector(state => state.myOrder); // myOrder from store

    console.log('order',orders);

    useEffect(() => {
        dispatch(myOrders()); // from action
        // dispatch(allOrders());

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch])

    // const deleteOrderHandler = (id) => {
    //     dispatch(deleteOrder(id))
    // }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Số lượng',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Tổng tiền',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Trạng thái',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Hành động',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions:
                <Fragment>
                    <Link to={`/order/${order._id}`} className="btn btn-primary">
                        <i className="fa fa-eye"></i>
                    </Link>
                    {/* <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
                        <i className="fa fa-trash"></i>
                    </button> */}
                </Fragment>
                    
                    

            })
        })

        return data;
    }

    return (
        <Fragment>

            <MetaData title={'My Orders'} />


            {loading ? <Loader /> : (
                <Fragment>
                    <div className="gio-hang row d-flex justify-content-between">
                        <div className="col-12 col-lg-12 order-confirm">
                        <h2 className="gio-hang-tieu-de">Đơn hàng của tôi</h2>
                        <MDBDataTable
                            data={setOrders()}
                            className="px-3"
                            bordered
                            striped
                            hover
                        />
                        </div>
                    </div>
                </Fragment>
                
                
            )}
            

        </Fragment>
    )
}

export default ListOrders