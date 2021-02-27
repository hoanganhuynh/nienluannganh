import React,
{
    Fragment,
    useState,
    useEffect
} from 'react';
import Pagination from 'react-js-pagination';

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




const Home = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const alert = useAlert();
    const dispatch = useDispatch();

    const {
        loading,
        products,
        error,
        productCount,
        resPerPage
    } = useSelector(state => state.products);
    
    useEffect(() => {
        if(error) return alert.error(error);

        dispatch(getProducts(currentPage));

    }, [dispatch, alert, error, currentPage])

    function setCurrentpageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Trang web mua sắm hàng đầu Việt Nam'} />

                    <h1 id="products_heading">Sản phẩm gần đây</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                            {products && products.map(product => (
                                <Product key={product._id} product={product} />
                            ))}
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
