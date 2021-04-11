import React, { Fragment, useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'
import { getProductReviews, deleteReview, clearErrors } from '../../actions/product.actions'
import { DELETE_REVIEW_RESET } from '../../constants/product.constant'
import { toast } from 'react-toastify'

const ProductReviews = () => {

    const [productId, setProductId] = useState('')

    const dispatch = useDispatch();

    const { error, reviews } = useSelector(state => state.productReviews);
    const { isDeleted, error: deleteError } = useSelector(state => state.review)

    useEffect(() => {

        if (error) {
            // toast.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors())
        }

        

        if (productId !== '') {
            dispatch(getProductReviews(productId))
        }

        if (isDeleted) {
            toast.success('Đánh giá đã được xoá !');
            dispatch({ type: DELETE_REVIEW_RESET })
        }



    }, [dispatch, error, productId, isDeleted, deleteError])

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, productId))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductReviews(productId))
    }

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,

                actions:
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteReviewHandler(review._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'Product Reviews'} />
            <div className="pRow row">
                <div className="col-12 col-md-3 pl-0">
                    <Sidebar />
                </div>

                <div className="dashboard col-12 col-md-9">
                    <div className='title-img'><img src='/images/admin/pen.svg'></img></div>
                    <h1 className="db-title my-4">Xem đánh giá sản phẩm<span></span></h1>

                    <form className='dFlex form-search item-in-cart' onSubmit={submitHandler}>
                        {/* <span className="fa fa-search"></span> */}
                        <input
                            style={{width:'270px'}}
                            type="text"
                            id="name_field"
                            className="search-input-table"
                            value={productId}
                            placeholder="Nhập ID sản phẩm.."
                            onChange={(e) => setProductId(e.target.value)}
                        />
                        {/* <button id='restoreTable' type="button" onClick={restoreTable}>x</button> */}
                        <button id='doSearch' type="submit"><span className="fa fa-search"></span></button>
                    </form>
                    <ul style={{overflow:'scroll', height:'70vh'}} className="table-admin">
                        <li className="table-row row item-in-cart ra-giua">
                            <div className="col-2 col-lg-2">
                                <p className="admin-title-table cart-title-table">ID</p>
                            </div>

                            <div className="col-2 col-lg-1">
                                <p className="admin-title-table cart-title-table">Đánh giá</p>
                            </div>

                            <div className="col-2 col-lg-4">
                                <p className="admin-title-table cart-title-table">Bình luận</p>
                            </div>

                            <div className="col-2 col-lg-1">
                                <p className="admin-title-table cart-title-table">Avatar</p>
                            </div>

                            <div className="col-2 col-lg-2">
                                <p className="admin-title-table cart-title-table">Tác giả</p>
                            </div>

                            <div className="col-2 col-lg-2">
                                <p className="admin-title-table cart-title-table text-center">Hành động</p>
                            </div>
                        </li>

                        {reviews && reviews.length == 0 ? (
                        <li className="row item-in-cart ra-giua">
                            <div className="col-12 col-lg-12">
                                <p className="admin-null-table cart-title-table text-center">Chưa có dữ liệu</p>
                            </div>
                        </li>
                        ):('')}

                        {reviews && reviews.map(review => (
                            <li className="table-row row item-in-cart ra-giua">
                                <div className="col-2 col-lg-2">
                                    <p className="admin-title-table cart-title-table admin-row-color">{review._id.length > 10 ? review._id.substring(0,10)+'...' : review._id}</p>
                                </div>

                                <div className="col-2 col-lg-1">
                                    <p className="admin-title-table cart-title-table admin-row-color">{review.rating} <span style={{color:'orange'}} className="fa fa-star"></span></p>
                                </div>

                                <div className="col-2 col-lg-4">
                                    <p className="admin-title-table cart-title-table admin-row-color">{review.comment}</p>
                                </div>

                                <div className="col-2 col-lg-1">
                                    <img width="36px" src={review.urlAvatar}></img>
                                </div>

                                <div className="col-2 col-lg-2">
                                    
                                    <p className="admin-title-table cart-title-table admin-row-color">{review.name}</p>
                                </div>

                                <div className="ra-giua col-2 col-lg-2">
                                    <button className="del-item-admin" onClick={() => deleteReviewHandler(review._id)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>    

                </div>
                    
            </div>

        </Fragment>
    )
}

export default ProductReviews