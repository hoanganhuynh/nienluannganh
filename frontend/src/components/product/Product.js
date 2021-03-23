import React from 'react';
import { Link } from 'react-router-dom'

const Product = ({ product, col }) => {
    return (
        // <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
        //     <div className="card p-3 rounded">
        //         <img
        //             className="card-img-top mx-auto"
        //             src={product.images[0].url}
        //         />
        //         <div className="card-body d-flex flex-column">
        //             <h5 className="card-title">
        //                 <Link to={`/product/${product._id}`}>{product.name}</Link>
        //             </h5>
        //             <div className="ratings mt-auto">
        //                 <div className="rating-outer">
        //                     <div className="rating-inner" style={{ width: `${(product.rating / 5) * 100}%` }}></div>
        //                 </div>
        //                 <span id="no_of_reviews">{product.numOfReview} Đánh giá</span>
        //             </div>
        //             <p className="card-text">{product.price} VNĐ</p>
        //         </div>
        //     </div>
        // </div>
        // <p>hi</p>
        <li>
            <figure>
                <a className="aa-product-img" href={`/product/${product._id}`}><img src={product.images[0].url} alt={product.name}></img></a>
                {/* <a className="aa-add-card-btn"href="#"><div className="rating-inner" style={{ width: `${(product.rating / 5) * 100}%` }}></div></a> */}
                <figcaption>
                    <h4 className="aa-product-title"><a href={`/product/${product._id}`}>{product.name}</a></h4>
                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${(product.rating / 5) * 100}%` }}></div>
                    </div>
                    <br></br>
                    <span className="aa-product-price">{product.price} VNĐ</span>
                </figcaption>
            </figure>          
            <div className="aa-product-hvr-content">
                {/* <a href="#" data-toggle="tooltip" data-placement="top" title="Add to Wishlist"><span class="fa fa-heart-o"></span></a> */}
                {/* <a href="#" data-toggle="tooltip" data-placement="top" title="Compare"><span class="fa fa-exchange"></span></a> */}
                <a href="#" data-toggle2="tooltip" data-placement="top" title="Quick View" data-toggle="modal" data-target="#quick-view-modal"><span class="fa fa-search"></span></a>                          
            </div>
            {product.stock > 0 ? (
                <span className="aa-badge aa-hot" href="#">HOT!</span> 
            ) : (
                <span className="aa-badge aa-sold-out" href="#">Hết hàng</span>  
            )}               
        </li>
    )
}

export default Product
