import React, { Fragment, useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import ReactImageMagnify from 'react-image-magnify';

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

        if (count.valueAsNumber >= product.stock) {
            toast.error(`Chỉ còn ${product.stock} sản phẩm !`)
            return;
        }
        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }

    const decreaseQty = () => {

        const count = document.querySelector('.count')

        if (count.valueAsNumber <= 1) {
            toast.error(`Mua tối thiểu 1 sản phẩm !`)
            return;
        }
        const qty = count.valueAsNumber - 1;
        setQuantity(qty)
    }

    function setUserRatings() {
        const stars = document.querySelectorAll('.star');
        const danh_gia = document.querySelectorAll('.danh-gia');

        danh_gia.forEach((dg) => {
            ['click'].forEach(function(e) {
                dg.classList.add('show-danh-gia');
            })
        })

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

    
    function formatCurrencyVN() {
        return product && product.price && product.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
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
                <div id="fb-root"></div>
                
                {/* <div className="row f-flex justify-content-around">
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
                )} */}

  <section id="aa-product-details">
    <div className="container">

      <div className="row">
        <div className="col-md-12">
          <div className="aa-product-details-area">
            <div className="aa-product-details-content">
              <div className="row">

                <div className="zoom-image col-md-5 col-sm-5 col-xs-12">                              
                  <div className="aa-product-view-slider">                                
                    

                    <ReactImageMagnify {...{
                        smallImage: {
                            alt: 'Wristwatch by Ted Baker London',
                            isFluidWidth: true,
                            src: product && product.images && product.images[0].url
                        },
                        largeImage: {
                            src: product && product.images && product.images[0].url,
                            width: 1400,
                            height: 1800
                        }
                    }} />

                    


                  </div>
                </div>

                

                <div className="thongtin-sp col-md-7 col-sm-7 col-xs-12">
                  <div className="aa-product-view-content">
                        <p>
                        Danh mục: <span style={{color: 'dodgerblue'}}>{product.category}</span>
                      </p>
                    <h2>{product.name}</h2>
                    <div className="rating-detail">
                        <p>({product.rating} )</p>
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(product.rating / 5) * 100}%` }}></div>
                        </div>
                        <p>({product && product.reviews && product.reviews.length} đánh giá)</p>
                    </div>
                    
                    <div className="aa-price-block">
                      <span className="aa-product-view-price">{formatCurrencyVN()} ₫</span>
                      {/* <span className="re"><span className="fa fa-dollar"></span>  Rẻ hơn hoàn tiền</span> */}
                      <img width="130px" src="https://salt.tikicdn.com/ts/upload/2e/da/c9/4b9c0150392c753ccb65b2595500e9d6.png"></img>
                    </div>
                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis animi, veritatis quae repudiandae quod nulla porro quidem, itaque quis quaerat!</p> */}
                    
                    <div style={{margin: "16px 0"}}>Nhà cung cấp: {product.seller}<img style={{marginLeft:"6px"}} width="80px" src="https://res.cloudinary.com/hha-nlnganh/image/upload/v1616643375/slider/officicalstore_fyjvsq.png"></img></div>
                    <p style={{marginTop: "16px", borderTop: "1px solid #ddd", paddingTop: "6px"}}>Số lượng</p>
                    <div className="aa-prod-quantity">
                    
                      <div className="tang-giam stockCounter d-inline">
                            <span className="giam-sl btn " disabled={product.stock === 0} onClick={decreaseQty}>-</span>
        
                            <input type="number" className="so-luong form-control count d-inline" value={quantity} readOnly />
        
                            <span className="tang-sl btn " disabled={product.stock === 0} onClick={increaseQty}>+</span>
                            <span className="sl-sp">Chỉ còn lại {product.stock} sản phẩm</span>
                        </div>
                      
                    </div>
                    <div className="aa-prod-view-bottom">
                      <a onClick={addToCart} className="aa-add-to-cart-btn" href="#">Thêm vào giỏ hàng</a>
                    </div>
                    <div className="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Chia sẻ</a></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="aa-product-details-bottom">

              <ul className="nav nav-tabs" id="myTab2">
                <li><a href="#description" data-toggle="tab">Mô tả</a></li>
                <li><a href="#review" data-toggle="tab">Đánh giá ({product && product.reviews && product.reviews?.length})</a></li>                
              </ul>

              <div className="tab-content">
                <div className="tab-pane fade in active" id="description">
                    <p>{product.description}</p>
                </div>

                <div className="tab-pane fade " id="review">
                 <div className="aa-product-review-area">
                   <h4>{product && product.reviews && product.reviews.length} đánh giá sản phẩm {product.name}</h4> 
                   {product.reviews && product.reviews.length > 0 && (
                            <ListReviews reviews={product.reviews} />
                        )}
                   
                   <h4>Thêm đánh giá</h4>
                   <form action="" className="aa-review-form">
                   {user ? <button 
                            id="review_btn"
                            type="button" 
                            className="btn btn-default aa-review-submit"
                            data-toggle="modal" 
                            data-target="#ratingModal" 
                            onClick={setUserRatings}>
                                    Thêm đánh giá
                        </button> 
                        :
                        <div className="alert alert-danger mt-5" type='alert'>Đăng nhập để gửi đánh giá</div>
                        }
                    {/* <button
                        data-dismiss="modal" 
                        aria-label="Close" 
                        onClick={reviewHandler}  
                        type="submit" 
                        className="btn btn-default aa-review-submit">
                            Gửi đánh giá
                        </button> */}
                   </form>
                   
                   <div className="danh-gia aa-your-rating">
                     {/* <p>Đánh giá số sao</p> */}
                     
                    <ul className="danh-gia stars">
                        <li className="star"><i className="fa fa-star"></i></li>
                        <li className="star"><i className="fa fa-star"></i></li>
                        <li className="star"><i className="fa fa-star"></i></li>
                        <li className="star"><i className="fa fa-star"></i></li>
                        <li className="star"><i className="fa fa-star"></i></li>
                    </ul>
                   </div>
                   <form action="" className="danh-gia aa-review-form">
                      <div className="form-group">
                        <textarea 
                        name="review"
                        id="review"
                        
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="form-control"
                        rows="3"
                        id="message">
                        </textarea>
                      </div>
                      
                      <button
                      data-dismiss="modal" 
                      aria-label="Close" 
                      onClick={reviewHandler}  
                      type="submit" 
                      className="btn btn-default aa-review-submit">
                          Gửi đánh giá
                    </button>
                   </form>
                 </div>
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
        </Fragment>
    )
}

export default ProductDetails
