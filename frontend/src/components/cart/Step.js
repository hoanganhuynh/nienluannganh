import React from 'react'

const Step = () => {
    return (
        <div className="processStep">
            <div className="step-item">
                <span className="cricle-step"><p className="num-step">1</p></span>
                {/* <span className="cricle-step">1</span> */}
                <span className="step-title"><a href="/cart">Giỏ hàng của bạn</a></span>
            </div>
            <img className="step-image" src="https://res.cloudinary.com/hha-nlnganh/image/upload/v1616940225/step_f6cxfy.svg"></img>

            <div className="step-item">
                <span className="cricle-step"><p className="num-step">2</p></span>
                <span className="step-title"><a href="/shipping">Thông tin giao hàng</a></span>
            </div>
            <img className="step-image" src="https://res.cloudinary.com/hha-nlnganh/image/upload/v1616940225/step_f6cxfy.svg"></img>

            <div className="step-item">
                <span className="cricle-step"><p className="num-step">3</p></span>
                <span className="step-title"><a href="/orders/confirm">Xác nhận hoá đơn</a></span>
            </div>
            <img className="step-image" src="https://res.cloudinary.com/hha-nlnganh/image/upload/v1616940225/step_f6cxfy.svg"></img>

            <div className="step-item">
                <span className="cricle-step"><p className="num-step">4</p></span>
                <span className="step-title "><a href="/payment">Xác nhận đơn hàng</a></span>
            </div>
            <img className="step-image" src="https://res.cloudinary.com/hha-nlnganh/image/upload/v1616940225/step_f6cxfy.svg"></img>

            <div className="step-item">
                <span className="cricle-step"><p className="num-step">5</p></span>
                <span className="step-title"><a href="/success">Đặt hàng thành công</a></span>
            </div>
            
        </div>
    )
}

export default Step
