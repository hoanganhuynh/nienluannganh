import React , { useState } from 'react';
import { Modal } from 'react-bootstrap';
// import Modal from 'react-bootstrap/Modal'
// import { Link } from 'react-router-dom'

const Product = ({ product }) => {
   

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }
    // console.log(show);
    return (
        <li>
            <figure>
                <a className="aa-product-img" href={`/product/${product._id}`}><img src={product.images[0].url} alt={product.name}></img></a>
                <figcaption>
                    <h4 className="aa-product-title"><a href={`/product/${product._id}`}>{product.name.length > 18 ? product.name.substring(0,18)+'...' : product.name}</a></h4>
                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${(product.rating / 5) * 100}%` }}></div>
                    </div>
                    <br></br>
                    <span className="aa-product-price">{product.price} VNĐ</span>
                </figcaption>
            </figure> 

            <div className="aa-product-hvr-content">
                <a onClick={handleShow} href="#" data-toggle2="tooltip" data-placement="top" title="Quick View" data-toggle="modal" data-target="#quick-view-modal"><span class="fa fa-search"></span></a>                          
            </div>

            <Modal size="lg" centered aria-labelledby="contained-modal-title-vcenter" isOpen={show} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <div className="modal-product">
                        <img style={{marginRight:'16px'}} width="420px" src={product && product.images && product.images[0] && product.images[0].url}></img>
                        <div>
                            <h3><a href={`/product/${product._id}`}>{product.name.length > 18 ? product.name.substring(0,25)+'...' : product.name}</a></h3>
                            <div className="rating-detail">
                                <p>({product.rating} )</p>
                                <div className="rating-outer">
                                    <div className="rating-inner" style={{ width: `${(product.rating / 5) * 100}%` }}></div>
                                </div>
                                <p>({product && product.reviews && product.reviews.length} đánh giá)</p>
                            </div>
                            <p className="productDescription">{product.description}</p>
                            <p><a style={{color:"dodgerblue"}} href={`/product/${product._id}`}>Xem chi tiết</a></p>
                            <div className="aa-price-block">
                                <span className="aa-product-view-price">{product && product.price && product.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} ₫</span>
                                <img width="130px" src="https://salt.tikicdn.com/ts/upload/2e/da/c9/4b9c0150392c753ccb65b2595500e9d6.png"></img>
                            </div>
                            
                            <p style={{marginTop: "16px", borderTop: "1px solid #ddd", paddingTop: "6px"}}>Số lượng:<span className="sl-sp">Chỉ còn lại {product.stock} sản phẩm</span></p>

                            </div>
                    </div>
                    
                </Modal.Body>
            </Modal>

            {product.stock > 0 ? (
                <span className="" href="#"></span> 
            ) : (
                <span className="aa-badge aa-sold-out" href="#">Hết hàng</span>  
            )}   
        </li>
    )
}

export default Product
