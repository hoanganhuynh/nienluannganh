import React,
{
    Fragment,
    useState,
    useEffect
} from 'react';
import Pagination from 'react-js-pagination';

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import MetaData from './layouts/MetaData';
import Product from './product/Product';
import Loader from './layouts/Loader';

import {
    useDispatch,
    useSelector
} from 'react-redux';

import { useAlert } from 'react-alert';

import {
    getProducts
} from '../actions/product.actions';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);


const Home = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([20000, 100000])

    const alert = useAlert();
    const dispatch = useDispatch();

    const {
        loading,
        products,
        error,
        productCount,
        resPerPage
    } = useSelector(state => state.products);

    const keyword = match.params.keyword; 
    
    useEffect(() => {
        if(error) return alert.error(error);

        dispatch(getProducts(keyword, currentPage, price));

    }, [dispatch, alert, error, keyword, currentPage, price])

    function setCurrentpageNo(pageNumber) {
        setCurrentPage(pageNumber)
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
                                <div className="px-5">
                                    <Range
                                        marks={{
                                            20000: `20000đ`,
                                            100000: `100000đ`
                                        }}
                                        min={20000}
                                        max={100000}
                                        defaultValue={[20000, 100000]}
                                        tipFormatter={value => `${value}`}
                                        tipProps={{
                                            placement: "top",
                                            visible: true
                                        }}
                                        value={price}
                                        onChange={price => setPrice(price)}
                                    />
                                </div>
                            </div>

                            <div className="col-6 col-md-9">
                                <div className="row">
                                    {products.map(product => (
                                        <Product key={product._id} product={product} col={4} />
                                    ))}
                                </div>
                            </div>
                        </Fragment>
                    ) : (
                            products.map(product => (
                                <Product key={product._id} product={product} col={3} />
                            ))
                        )}

                </div>
                    </section>

                    {resPerPage <= productCount &&(
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productCount}
                                onChange={setCurrentpageNo}
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
        </Fragment>
    )
}

export default Home
