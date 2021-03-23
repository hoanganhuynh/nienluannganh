import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import '../../src/style.css';
import '/Users/popmaker20/projects/knowllipop/hoangan/nienluannganh/frontend/src/default-theme.css';


import MetaData from './layouts/MetaData'
import Product from './product/Product'
import Loader from './layouts/Loader'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch, useSelector } from 'react-redux'
// import { useAlert } from 'react-alert';
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

    const { loading, products, error, productCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)

    const keyword = match.params.keyword

    useEffect(() => {
        if (error) {
            return toast.error(error)
        }

        dispatch(getProducts(keyword, currentPage, price, category, rating));


    }, [dispatch, error, keyword, currentPage, price, category, rating])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = productCount;
    if (keyword) {
        count = filteredProductsCount
    }
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Trang web mua sắm hàng đầu Việt Nam'} />

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

                                    {/* <div className="mt-5">
                                        <h4 className="mb-3">
                                            Categories
                                        </h4>

                                        <ul className="pl-0">
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
                                    </div> */}

                                    <div className="aa-sidebar-widget">
                                        <h4 className="mb-3">
                                            Categories
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
                                            Ratings
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
                                {/* <div className="row">
                                    {products?.map(product => (
                                        <Product key={product._id} product={product} col={4} />
                                    ))}
                                </div> */}
                                <ul className="aa-product-catg">
                                    {products?.map(product => <Product key={product._id} product={product} col={3} />)}
                                </ul>
                            </div>
                        </Fragment>
                    ) : (
                        <ul className="aa-product-catg">
                            {products?.map(product => <Product key={product._id} product={product} col={3} />)}
                        </ul>
                        )
                    }

                </div>
                    </section>

                    {resPerPage <= count &&(
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'>'}
                                prevPageText={'<'}
                                firstPageText={'Trang đầu'}
                                lastPageText={'Trang cuối'}
                                itemClass="page-item"
                                linkClass = "page-link"
                            />
                        </div>
                    )}
                </Fragment>
            )}
            <p></p>
            <a className="scrollToTop" href="#"><i className="fa fa-chevron-up"></i></a>
        </Fragment>
    )
}

export default Home
