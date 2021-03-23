import React from 'react'

const Loader = () => {
    return (
        //<div className="loader"></div> // loading 1

        // <div className="lds-ripple"><div></div><div></div></div> // loading 2

        <div id="wpf-loader-two">          
            <div className="wpf-loader-two-inner">
            <span>Loading</span>
            </div>
        </div> 
    )
}

export default Loader
