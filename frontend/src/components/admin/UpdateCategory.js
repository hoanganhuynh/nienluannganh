import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch, useSelector } from 'react-redux'
import { updateCategory, getCategoryDetails, clearErrors } from '../../actions/product.actions'
import { UPDATE_CATEGORY_RESET } from '../../constants/product.constant'

const UpdateCategory = ({ match, history }) => {

    const [name, setName] = useState('');
    
    const dispatch = useDispatch();

    const { error, category } = useSelector(state => state.categoryDetails)
    console.log(category)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.category);

    const categoryId = match.params.id;

    useEffect(() => {

        if (category && category._id !== categoryId) {
            dispatch(getCategoryDetails(categoryId));
        } else {
            setName(category.name);
        }

        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }

        if (updateError) {
            toast.error(updateError)
            dispatch(clearErrors())
        }


        if (isUpdated) {
            history.push('/admin/categories');
            toast.success('Cập nhật danh mục thành công !')
            dispatch({ type: UPDATE_CATEGORY_RESET })
        }

    }, [dispatch, error, isUpdated, history, updateError, category, categoryId])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);

        dispatch(updateCategory(category._id, formData))
    }



    return (
        <Fragment>
            <MetaData title={'Update Product'} />
            <div className="pRow row">
                <div className="col-12 col-md-3 pl-0">
                    <Sidebar />
                </div>

            
                <div style={{color:'#fff', overflow:'scroll', height:'96vh', padding: '30px 40px'}} className="new-product update-profile-admin col-12 col-md-5">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form style={{paddingBottom:'50px'}} className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Cập nhật danh mục <span style={{fontSize:'17px'}}>#{categoryId}</span></h1>

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


                                <button
                                    style={{width: '100%', borderRadius:'4px'}}
                                    id="login_button"
                                    type="submit"
                                    className="aa-browse-btn aa-browse-btn-admin"
                                    disabled={loading ? true : false}
                                >
                                    Cập nhật
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>

                <div className="col-12 col-md-4">
                    <Fragment>
                        <div className="admin-create-product ra-giua item-in-cart wrapper my-5">
                            <img width="530px" src="https://res.cloudinary.com/hha-nlnganh/image/upload/v1618062042/Update-pana_yi6y6c.svg"></img>
                        </div>
                        
                    </Fragment>
                </div>                  
            
            </div>

        </Fragment>
    )
}

export default UpdateCategory