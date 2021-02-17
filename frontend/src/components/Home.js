import React,
{
    Fragment,
    useEffect
} from 'react';

import MetaData from './layouts/MetaData';
import Product from './product/Product';

import {
    useDispatch,
    useSelector
} from 'react-redux';

import {
    getProducts
} from '../actions/product.actions';




const Home = () => {

    const dispatch = useDispatch();

    const {
        loading,
        products,
        error,
        productCount
    } = useSelector(state => state.products);
    
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    return (
        <Fragment>
            {loading ? <h3>Đang tải sản phẩm...</h3> : (
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

                </Fragment>
            )}
        </Fragment>
    )
}

export default Home
