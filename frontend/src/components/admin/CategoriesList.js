import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { MDBDataTable } from 'mdbreact'

import MetaData from '../layouts/MetaData'
// import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'
// import HeaderAdmin from '../layouts/HeaderAdmin'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminCategories, getAdminProducts, deleteCategory , clearErrors } from '../../actions/product.actions'
import { DELETE_CATEGORY_RESET } from '../../constants/product.constant'
// import { deleteCategory } from '../../../../backend/controllers/product.controller'

const CategoriesList = ({ history }) => {

    //const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, categories } = useSelector(state => state.categories);

    // const { products } = useSelector(state => state.products);
    // console.log('products',products)
    console.log('hi', categories);
    const { error: deleteError, isDeleted } = useSelector(state => state.category)

    useEffect(() => {
        dispatch(getAdminCategories());
        // dispatch(getAdminProducts());

        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }

        if (deleteError) {
            toast.error(deleteError)
            dispatch(clearErrors())
        }

        if (isDeleted) {
            //alert.success('Product deleted successfully');
            toast.success('Đã xoá danh mục !')
            history.push('/admin/categories');
            dispatch({ type: DELETE_CATEGORY_RESET })
        }

    }, [dispatch, error, history])


    const deleteCategoryHandler = (id) => {
        dispatch(deleteCategory(id))
    }

    let title = '';
    let total = categories && categories.length;
    
    if (total > 0) title = 'Tất cả danh muc: ' + total.toString();
    else title = 'Không có danh muc'

    function nonAccentVietnamese(str) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
    }

    function doSearch() {
            document.getElementById('restoreTable').style.display= 'inline-block';
            let n = document.getElementById("noresults");

            let inputValue = document.getElementById("q").value;
            let khongDau = nonAccentVietnamese(inputValue).toLowerCase();
            console.log('nhap vao: ',khongDau);

            let rows = document.getElementsByClassName('value-name');
            let tableRow = document.getElementsByClassName('table-row');
            let on = 0;
            for ( let i = 0; i < rows.length; i++ ) {
                let nameProduct = rows[i].innerHTML.toLowerCase();
                let valueThisRow = nonAccentVietnamese(nameProduct);

                if ( valueThisRow ) {
                    if ( khongDau.length == 0 || valueThisRow.includes(khongDau) ){
                        console.log('Hien: ',valueThisRow)
                        rows[i].style.display = ""
                        tableRow[i+1].classList.remove('dNone');
                        on++;
                    } else {
                    rows[i].style.display = "none";
                    tableRow[i+1].classList.add('dNone');
                  }
                }
            }
            if ( on == 0 && n ) {
                n.style.display = "block";
                document.getElementById("qt").innerHTML = inputValue;
            } else {
                n.style.display = "none";
            }
    }

    function restoreTable() {
        document.getElementById("noresults").style.display = "none";;
        document.getElementById('restoreTable').style.display= 'none';
        let tableRow = document.getElementsByClassName('table-row');
        let rows = document.getElementsByClassName('value-name');
        document.getElementById('q').value = '';

        for(let i=0; i<rows.length;i++) {
            rows[i].style.display = "";
            tableRow[i].classList.remove('dNone');
            tableRow[rows.length].classList.remove('dNone');
        }
    }

    

    return (
        <Fragment>
            <MetaData title={'All Products'} />
            <div className="pRow row">
                <div className="pl-0 col-12 col-md-3">
                    <Sidebar />
                </div>

                <div className="dashboard col-12 col-md-9">
                    <div className='title-img'><img src='/images/admin/computer.svg'></img></div>
                    <h1 className="db-title my-4">{title}<span></span></h1>
                    <Link className="btn-add-new" to="/admin/category"><i className="mr-8 fa fa-plus"></i>Thêm mới danh mục</Link>
                    <form method='get' className='dFlex form-search item-in-cart' actions='/'>
                        {/* <span className="fa fa-search"></span> */}
                        <input placeholder='Tên sản phẩm...'
                            className='search-input-table'
                            type="text"
                            name="q"
                            id="q"
                            // value=""
                            onKeyUp={doSearch}
                            >
                        </input>
                        <button id='restoreTable' type="button" onClick={restoreTable}>x</button>
                        <button id='doSearch' type="button" onClick={doSearch}><span className="fa fa-search"></span></button>
                    </form>
                    <ul style={{overflow:'scroll', height:'70vh'}} className="table-admin">

                        <li className="table-row row item-in-cart ra-giua">
                            

                            <div className="col-2 col-lg-3">
                                <p className="admin-title-table cart-title-table">ID</p>
                            </div>

                            <div className="col-2 col-lg-7">
                                <p className="admin-title-table cart-title-table">Tên danh muc</p>
                            </div>

                            

                            <div className="col-2 col-lg-2">
                                <p className="admin-title-table cart-title-table text-center">Hành động</p>
                            </div>
                        </li>

                        {categories && categories.length == 0 ? (
                        <li className="row item-in-cart ra-giua">
                            <div className="col-12 col-lg-12">
                                <p className="admin-null-table cart-title-table text-center">Chưa có dữ liệu</p>
                            </div>
                        </li>
                        ):('')}

                        {categories && categories.map(category => (
                            <li className="table-row row item-in-cart ra-giua">
                                

                                <div className="col-2 col-lg-3">
                                    <p className="admin-title-table cart-title-table admin-row-color"><Link to={`/product/${category._id}`}>{category._id.substring(0,20)+'...'}</Link></p>
                                </div>

                                <div className="col-2 col-lg-7">
                                    <p className="value-name admin-title-table cart-title-table admin-row-color">{category.name.length > 20 ? category.name.substring(0,20)+'...' : category.name}</p>
                                </div>

                                

                                <div className="ra-giua col-2 col-lg-2">
                                    {/* <p className="admin-title-table cart-title-table text-center admin-row-color">Hành động</p> */}
                                    {/* <i id="delete_cart_item" className="fa fa-trash btn" ></i> */}
                                    <Link to={`/admin/category/${category._id}`} className="ra-giua item-in-cart del-item-admin edit-item-admin">
                                        <i className="fa fa-pencil"></i>
                                    </Link>
                                    <button className="del-item-admin" onClick={() => deleteCategoryHandler(category._id)}>
                                        <i className="fa fa-trash"></i>
                                    </button>

                                </div>
                            </li>
                        ))}

                        <li className="row item-in-cart" id="noresults" >
                            <div className="col-12 col-lg-12">
                                <p className="admin-null-table cart-title-table text-center">Không có dữ liệu với từ khoá "<span id="qt"></span>"</p>
                            </div>
                        </li>

                    </ul>
                    
                    {/* <Fragment> */}
                        {/* <h1 className="my-5">{title}</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setProducts()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )} */}

                    {/* </Fragment> */}
                </div>
            </div>

        </Fragment>
    )
}

export default CategoriesList