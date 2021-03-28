import React, { Fragment } from 'react'

const Footer = () => {
    return (
        <Fragment>
            <footer id="aa-footer">
                <div className="aa-footer-top">
                <div className="container">
                    <div className="row">
                    <div className="col-md-12">
                    <div className="aa-footer-top-area">
                        <div className="row">
                        <div className="col-md-3 col-sm-6">
                            <div className="aa-footer-widget">
                            <h3>Trang chủ</h3>
                            <ul className="aa-footer-nav">
                                <li><a href="/">Trang chủ</a></li>
                                <li><a href="/me">Thông tin tài khoản</a></li>
                                <li><a href="/orders/me">Giỏ hàng</a></li>
                                
                            </ul>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="aa-footer-widget">
                            <div className="aa-footer-widget">
                                <h3>Khác</h3>
                                <ul className="aa-footer-nav">
                                <li><a href="#">Chính sách</a></li>
                                <li><a href="#">Điều khoản</a></li>
                                <li><a href="#">Ưu đãi</a></li>
                                <li><a href="#">Thông báo</a></li>
                                
                                </ul>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="aa-footer-widget">
                            <div className="aa-footer-widget">
                                <h3>Mạng xã hội</h3>
                                <ul className="aa-footer-nav">
                                <li><a href="#">Facebook</a></li>
                                <li><a href="#">Instagram</a></li>
                                <li><a href="#">Zalo</a></li>
                                <li><a href="#">Twitter</a></li>
                                <li><a href="#">Linkin</a></li>
                                </ul>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="aa-footer-widget">
                            <div className="aa-footer-widget">
                                <h3>Liên hệ với chúng tôi</h3>
                                <address>
                                <p><span className="fa fa-map"></span>Cần Thơ</p>
                                <p><span className="fa fa-phone"></span>0327846162</p>
                                <p><span className="fa fa-envelope"></span>anb1706560@gmail.com</p>
                                </address>
                                <div className="aa-footer-social">
                                <a href="#"><span className="fa fa-facebook"></span></a>
                                <a href="#"><span className="fa fa-twitter"></span></a>
                                <a href="#"><span className="fa fa-google-plus"></span></a>
                                <a href="#"><span className="fa fa-youtube"></span></a>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                </div>
                <div className="aa-footer-bottom">
                <div className="container">
                    <div className="row">
                    <div className="col-md-12">
                    <div className="aa-footer-bottom-area">
                        <p>Designed by <a href="http://www.markups.io/">Hoang An</a></p>
                        <div className="aa-footer-payment">
                        <span className="fa fa-cc-mastercard"></span>
                        <span className="fa fa-cc-visa"></span>
                        <span className="fa fa-paypal"></span>
                        <span className="fa fa-cc-discover"></span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                </div>
            </footer>
        </Fragment>
    )
}

export default Footer
