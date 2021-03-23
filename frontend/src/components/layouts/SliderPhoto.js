import React, { Fragment } from 'react'

const SliderPhoto = () => {
    return (
        <Fragment>
            <section id="aa-slider">
                <div className="aa-slider-area">
                    <div id="sequence" className="seq">
                    <div className="seq-screen">
                        <ul className="seq-canvas">
                            <li>
                                <div className="seq-model">
                                    <img data-seq src="https://picsum.photos/1920/700" alt="Men slide img" />
                                </div>
                                <div className="seq-title">
                                <span data-seq>Save Up to 75% Off</span>                
                                    <h2 data-seq>Men Collection</h2>                
                                    <p data-seq>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, illum.</p>
                                    <a data-seq href="#" className="aa-shop-now-btn aa-secondary-btn">SHOP NOW</a>
                                </div>
                            </li>
                            
                            <li>
                                <div className="seq-model">
                                    <img data-seq src="https://picsum.photos/1920/700" alt="Wristwatch slide img" />
                                </div>
                                <div className="seq-title">
                                    <span data-seq>Save Up to 40% Off</span>                
                                    <h2 data-seq>Wristwatch Collection</h2>                
                                    <p data-seq>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, illum.</p>
                                    <a data-seq href="#" className="aa-shop-now-btn aa-secondary-btn">SHOP NOW</a>
                                </div>
                            </li>                  
                        </ul>
                    </div>
                    <fieldset className="seq-nav" aria-controls="sequence" aria-label="Slider buttons">
                        <a type="button" className="seq-prev" aria-label="Previous"><span className="fa fa-angle-left"></span></a>
                        <a type="button" className="seq-next" aria-label="Next"><span className="fa fa-angle-right"></span></a>
                    </fieldset>
                </div>
                </div>
            </section>
        </Fragment>
    )
}

export default SliderPhoto
