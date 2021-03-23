import React, { useState } from 'react';

const Search = ({ history }) => {

    const [keyword, setKeyword] = useState("");

    const searchHandle = (e) => {
        e.preventDefault()

        if((keyword).trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }

        //return (encodeURIComponent(keyword).trim()) ? history.push(`/search/${keyword}`) : history.push('/')
    }

    return (
        <form onSubmit={searchHandle}>
            <div className="">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Tìm kiếm sản phẩm ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Search
