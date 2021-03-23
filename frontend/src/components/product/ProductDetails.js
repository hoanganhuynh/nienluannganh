import React, { Fragment, useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import '../../style.css'

import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import ListReviews from '../review/ListReviews'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearErrors, newReview } from '../../actions/product.actions'
import { addItemToCart } from '../../actions/cart.action'
import { NEW_REVIEW_RESET } from '../../constants/product.constant'



const ProductDetails = ({ match }) => {

    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const { loading, error, product } = useSelector(state => state.productDetails)

    console.log(product)

    const { user } = useSelector(state => state.auth)
    const { error: reviewError, success } = useSelector(state => state.newReview)


    useEffect(() => {
        dispatch(getProductDetails(match.params.id))

        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }

        if (reviewError) {
            toast.error(reviewError)
            dispatch(clearErrors())
        }

        if (success) {
            toast.success('Đã thêm đánh giá !')
            dispatch({ type: NEW_REVIEW_RESET })
        }

    }, [dispatch, error, reviewError, match.params.id, success])

    const addToCart = () => {
        dispatch(addItemToCart(match.params.id, quantity));
        toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng !`)
    }

    const increaseQty = () => {
        const count = document.querySelector('.count')

        if (count.valueAsNumber >= product.stock) return;

        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }

    const decreaseQty = () => {

        const count = document.querySelector('.count')

        if (count.valueAsNumber <= 1) return;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty)
    }

    function setUserRatings() {
        const stars = document.querySelectorAll('.star');

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');

                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange')
                    }
                }

                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow')
                    }
                }

                if (e.type === 'mouseout') {
                    star.classList.remove('yellow')
                }
            })
        }
    }

    const reviewHandler = () => {
        const formData = new FormData();

        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', match.params.id);

        dispatch(newReview(formData));
    }

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
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
            
                            <hr/>
            
                            <p id="product_price">{product.price} VNĐ</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" disabled={product.stock === 0} onClick={decreaseQty}>-</span>
            
                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />
            
                                <span className="btn btn-primary plus" disabled={product.stock === 0} onClick={increaseQty}>+</span>
                            </div>
                                <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock === 0} onClick={addToCart}>Thêm vào giỏ hàng</button>

                            <hr/>
            
                            <p>Trạng thái: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'}>{product.stock > 0 ? `Còn hàng (${product.stock})` : 'Hết hàng'}</span></p>
            
                            <hr/>
            
                            <h4 className="mt-2">Mô tả</h4>
                            <p>{product.description}</p>
                            <hr/>
                            <p id="product_seller mb-3">Cung cấp bởi: <strong>{product.seller}</strong></p>
                            {user ? <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" onClick={setUserRatings}>
                                        Gửi đánh giá
                            </button> 
                            :
                            <div className="alert alert-danger mt-5" type='alert'>Login to post your review.</div>
                            }
                            
                            
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
            
                                                    <textarea name="review" id="review" className="form-control mt-3" value={comment}
                                                        onChange={(e) => setComment(e.target.value)}>
            
                                                    </textarea>
            
                                                    <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close" onClick={reviewHandler}>Gửi</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>	
                            </div>
                        </div>
                    </div>
                    {product.reviews && product.reviews.length > 0 && (
                        <ListReviews reviews={product.reviews} />
                    )}
                </Fragment>
            )
        }
        </Fragment>
    )
}

export default ProductDetails
