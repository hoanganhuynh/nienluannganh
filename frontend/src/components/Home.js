import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import SliderPhoto from '../components/layouts/SliderPhoto';
import MenuCategory from '../components/layouts/MenuCategory';

import SupportComp from '../components/layouts/SupportComp'
import BrandPartner from '../components/layouts/BrandPartner'
import SendLetter from '../components/layouts/SendLetter'
import Footer from './layouts/Footer'

import Header from './layouts/_Header'

// import Pagination from 'react-bootstrap-4-pagination';

import ScrollToTop from "react-scroll-to-top";


import MetaData from './layouts/MetaData'
import Product from './product/Product'
import Loader from './layouts/Loader'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch, useSelector } from 'react-redux'

import { getProducts } from '../actions/product.actions'

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Home = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 5000000]);
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(0)

    const categories = [
        'Electronic',
        'Camera',
        'Laptop',
        'MobilePhone',
        'Food',
        'Book'
    ]

    

    const dispatch = useDispatch();

    const { 
        loading, 
        products, 
        error, 
        productsCount, 
        resPerPage, 
        filteredProductsCount
    } = useSelector(state => state.products)

    // console.log(productsCount)
    const keyword = match.params.keyword

    useEffect(() => {
        if (error) return toast.error(error)

        dispatch(getProducts(keyword, currentPage, price, category, rating));

    }, [])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = productsCount;
    if (keyword) {
        count = filteredProductsCount
    }
    // console.log(products)



    return (
        
        <Fragment>
            {/* <Header /> */}
            <ScrollToTop smooth />
            <MenuCategory />
            
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Trang web mua sắm hàng đầu Việt Nam'} />
                    <SliderPhoto />
                    {/* <h1 id="products_heading">Sản phẩm gần đây</h1> */}
                    <section id="products" className="container mt-5">
                        <div className="row">

                            {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        <aside className="aa-sidebar">
                                            <Range
                                                marks={{
                                                    1: `1đ`,
                                                    500000: `500000đ`
                                                }}
                                                min={1}
                                                max={500000}
                                                step={5000}
                                                defaultValue={[1, 500000]}
                                                tipFormatter={value => `${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />
                                            
                                            <hr className="my-5" />

                                            <div className="aa-sidebar-widget">
                                                <h4 className="mb-3">
                                                    Danh mục
                                                </h4>
                                                <ul className="aa-catg-nav">
                                                    {categories.map(category => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={category}
                                                            onClick={() => setCategory(category)}
                                                        >
                                                            {category}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            

                                            <hr className="my-3" />

                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Đánh giá
                                                </h4>

                                                <ul className="pl-0">
                                                    {[5, 4, 3, 2, 1].map(star => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={star}
                                                            onClick={() => setRating(star)}
                                                        >
                                                            <div className="rating-outer">
                                                                <div className="rating-inner"
                                                                    style={{
                                                                        width: `${star * 20}%`
                                                                    }}
                                                                >
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </aside>
                                    </div>

                                    <div className="col-6 col-md-9"> 
                                        <ul className="aa-product-catg">
                                            {products?.map(product => <Product key={product._id} product={product} />)}
                                        </ul>
                                    </div>
                                </Fragment>
                            ) : (
                                <ul className="aa-product-catg">
                                    {products?.map(product => <Product key={product._id} product={product} /> )}
                                </ul>
                                )
                            }

                        </div>
                    </section>

                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'>'}
                                prevPageText={'<'}
                                firstPageText={'Trang đầu'}
                                lastPageText={'Trang cuối'}
                                itemClass="page-item"
                                linkClass = "page-link"
                            />
                            {/* <Pagination {...paginationConfig} /> */}
                        </div>
                    )}
                </Fragment>
            )}
        <SupportComp />
        <BrandPartner />
        <SendLetter />
        {/* <Footer /> */}
        </Fragment>
    )
}

export default Home
