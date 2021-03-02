import React, { Fragment, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'

import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearErrors } from '../../actions/product.actions'


const ProductDetails = ({ match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, product } = useSelector(state => state.productDetails)

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, match.params.id])

    return (
        <Fragment>
        {loading ? <Loader /> : (
            <Fragment>
                    <MetaData title={product.name} />
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause='hover'>
                                {product.images && product.images.map(image => (
                                    <Carousel.Item key={image.public_id}>
                                        <img className="d-block w-100" src={image.url} alt={product.title} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
            
                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product.name}</h3>
                            <p id="product_id">Sản phẩm #{product._id}</p>
            
                            <hr/>
            
                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${(product.rating / 5) * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReview} đánh giá)</span>
            
                            <hr/>
            
                            <p id="product_price">{product.price} VNĐ</p>
                            <div className="stockCounter d-inline">
                                <span className={product.stock > 0 ? "btn btn-danger minus" : 'd-none'}>-</span>
            
                                <input type="number" className={product.stock > 0 ? "form-control count d-inline" : 'd-none'} value="1" readOnly />
            
                                <span className={product.stock > 0 ? 'btn btn-primary plus' : 'd-none'}>+</span>
                            </div>
                                <button type="button" id="cart_btn" className={product.stock > 0 ? "btn btn-primary d-inline ml-4" : 'd-none'}>Thêm vào giỏ hàng</button>

                            <hr/>
            
                            <p>Trạng thái: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'}>{product.stock > 0 ? `Còn hàng (${product.stock})` : 'Hết hàng'}</span></p>
            
                            <hr/>
            
                            <h4 className="mt-2">Mô tả</h4>
                            <p>{product.description}</p>
                            <hr/>
                            <p id="product_seller mb-3">Cung cấp bởi: <strong>{product.seller}</strong></p>
                            
                            <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                        Gửi đánh giá
                            </button>
                            
                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">
                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Gửi đánh giá</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
            
                                                    <ul className="stars">
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>
            
                                                    <textarea name="review" id="review" className="form-control mt-3">
            
                                                    </textarea>
            
                                                    <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Gửi</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>	
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }
        </Fragment>
    )
}

export default ProductDetails