import { get } from 'mongoose';
import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    setTimeout(function(){ 
        let getCurrentPage = window.location.href.toString().substring(22);
        // console.log(getCurrentPage.length)
        let classActive = ['blue-text', 'blue-bg']
        switch(getCurrentPage) {
            case 'dashboard' :
                document.getElementsByClassName('item-admin')[0].classList.add(...classActive)
                // document.getElementsByClassName('active-item-admin')[0].style.opacity = '1'
                break;
            case 'admin/products' :
                document.getElementsByClassName('item-admin')[1].classList.add(...classActive)
                break;
            case 'admin/users':
                document.getElementsByClassName('item-admin')[2].classList.add(...classActive)
                break;
            
            case 'admin/orders':
                document.getElementsByClassName('item-admin')[3].classList.add(...classActive)
                break;
            case 'admin/reviews':
                document.getElementsByClassName('item-admin')[4].classList.add(...classActive)
                break;
            default: break;
        }
        let isAdmin = ['dashboard', 'admin/products', 'admin/users', 'admin/orders', 'admin/reviews', 'admin/product'];
        for (let i = 0; i<=isAdmin.length; i++) {
            if(getCurrentPage == isAdmin[i] || getCurrentPage.length >= 35) {
              document.getElementById('aa-header').classList.add('dNone');
              document.getElementById('aa-footer').classList.add('dNone');
              document.getElementsByClassName('active-item-admin')[i].style.opacity = '1'
            } 
        }
    }, 400);

    return (
        // <div className="sidebar-wrapper">
        //     <nav id="sidebar">
        //         <ul className="list-unstyled components">
        //             <li>
        //                 <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
        //             </li>

        //             <li>
        //                 <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
        //                     className="fa fa-product-hunt"></i> Products</a>
        //                 <ul className="collapse list-unstyled" id="productSubmenu">
        //                     <li>
        //                         <Link to="/admin/products"><i className="fa fa-clipboard"></i> All</Link>
        //                     </li>

        //                     <li>
        //                         <Link to="/admin/product"><i className="fa fa-plus"></i> Create</Link>
        //                     </li>
        //                 </ul>
        //             </li>

        //             <li>
        //                 <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
        //             </li>

        //             <li>
        //                 <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
        //             </li>

        //             <li>
        //                 <Link to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
        //             </li>

        //         </ul>
        //     </nav>
        // </div>
        <div className="sidenav">
            <div className="aa-logo m-20">        
                <Link to="/dashboard">
                <span className="fa fa-shopping-cart"></span>
                <p>admin<strong>Shop</strong> <span>TRANG QUẢN TRỊ</span></p>
                </Link>
            </div>
            
            <div className="items-admin">
            
                <Link className="dFlex item-in-cart item-admin from-left" to="/dashboard">
                    <img src='/images/admin/switch.svg'>
                    </img> Dashboard
                    <div className="active-item-admin"></div>
                </Link>
                <Link className="dFlex item-in-cart item-admin from-left" to="/admin/products">
                    <img src='/images/admin/computer.svg'>
                    </img> Sản phẩm
                    <div className="active-item-admin"></div>
                </Link>
                <Link className="dFlex item-in-cart item-admin" to="/admin/users">
                    <img src='/images/admin/user.svg'>
                    </img> Người dùng
                    <div className="active-item-admin"></div>
                </Link>
                <Link className="dFlex item-in-cart item-admin" to="/admin/orders">
                    <img src='/images/admin/newspaper.svg'>
                    </img> Đơn đặt hàng
                    <div className="active-item-admin"></div>
                </Link>
                <Link className="dFlex item-in-cart item-admin" to="/admin/reviews">
                    <img src='/images/admin/pen.svg'></img>
                    Đánh giá sản phẩm
                    <div className="active-item-admin"></div>
                </Link>
                <Link className="dFlex item-in-cart item-admin" to="/">
                    <img src='/images/admin/home.svg'></img>
                    Trang chủ
                    <div className="active-item-admin"></div>
                </Link>
            </div>
            
        </div>
    )
}

export default Sidebar