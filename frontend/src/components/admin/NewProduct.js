import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch, useSelector } from 'react-redux'
import { newProduct, clearErrors } from '../../actions/product.actions'
import { getAdminCategories } from '../../actions/product.actions'

import { NEW_PRODUCT_RESET } from '../../constants/product.constant'

const NewProduct = ({ history }) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])

    
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newProduct);
    const { categories } = useSelector(state => state.categories);

    // const cateArr = []
    // categories && categories.map(category => {
    //     cateArr.push(category.name)
    // })


    useEffect(() => {

        dispatch(getAdminCategories());

        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }

        if (success) {
            history.push('/admin/products');
            toast.success('Đã thêm sản phẩm thành công !')
            dispatch({ type: NEW_PRODUCT_RESET })
        }

    }, [dispatch, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(newProduct(formData))
    }

    const onChange = e => {
        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }


    return (
        <Fragment>
            {/* <HeaderAdmin /> */}
            <MetaData title={'New Product'} />
            <div className="pRow row">
                <div className="pl-0 col-12 col-md-3">
                    <Sidebar />
                </div>

                <div style={{color:'#fff', overflow:'scroll', height:'96vh', padding: '30px 40px'}} className="new-product col-12 col-md-5">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Tạo sản phẩm mới</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Tên</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Giá</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Mô tả</label>
                                    <textarea className="form-control" id="description_field" rows="4" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Danh mục</label>
                                    <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {categories && categories.map(category => (
                                            <option key={category._id} value={category._id} >{category.name}</option>
                                        ))}

                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Kho</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Nhà cung cấp</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        value={seller}
                                        onChange={(e) => setSeller(e.target.value)}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>Ảnh</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Chọn hình
                                     </label>
                                    </div>

                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                </div>


                                <button
                                    style={{width: '100%', borderRadius:'4px'}}
                                    id="login_button"
                                    type="submit"
                                    className="aa-browse-btn aa-browse-btn-admin"
                                    disabled={loading ? true : false}
                                >
                                    Tạo
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>

                <div className="col-12 col-md-4">
                    <Fragment>
                        <div className="admin-create-product ra-giua item-in-cart wrapper my-5">
                            <img width="530px" src="/images/admin/create-pana.svg"></img>
                        </div>
                        
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default NewProduct