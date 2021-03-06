import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch, useSelector } from 'react-redux'
import { newCategory, clearErrors } from '../../actions/product.actions'
import { NEW_CATEGORY_RESET } from '../../constants/product.constant'

const NewProduct = ({ history }) => {

    const [name, setName] = useState('');
    // const [price, setPrice] = useState(0);
    // const [description, setDescription] = useState('');
    // const [category, setCategory] = useState('');
    // const [stock, setStock] = useState(0);
    // const [seller, setSeller] = useState('');
    // const [images, setImages] = useState([]);
    // const [imagesPreview, setImagesPreview] = useState([])

    

    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newCategory);

    useEffect(() => {

        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }

        if (success) {
            history.push('/admin/categories');
            toast.success('Đã thêm danh muc thành công !')
            dispatch({ type: NEW_CATEGORY_RESET })
        }

    }, [dispatch, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        // formData.set('price', price);
        // formData.set('description', description);
        // formData.set('category', category);
        // formData.set('stock', stock);
        // formData.set('seller', seller);

        // images.forEach(image => {
        //     formData.append('images', image)
        // })

        dispatch(newCategory(formData))
    }

    // const onChange = e => {

    //     // const files = Array.from(e.target.files)

    //     // setImagesPreview([]);
    //     // setImages([])

    //     files.forEach(file => {
    //         const reader = new FileReader();

    //         reader.onload = () => {
    //             if (reader.readyState === 2) {
    //                 setImagesPreview(oldArray => [...oldArray, reader.result])
    //                 setImages(oldArray => [...oldArray, reader.result])
    //             }
    //         }

    //         reader.readAsDataURL(file)
    //     })
    // }


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
                                <h1 className="mb-4">Tạo danh muc mới</h1>

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


                                {/* <div className='form-group'>
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

                                </div> */}


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