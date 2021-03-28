import React, { Fragment } from 'react'
import SimpleImageSlider from "react-simple-image-slider";

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


const SliderPhoto = () => {
    const handleDragStart = (e) => e.preventDefault();

    const images = [
        { url: "https://salt.tikicdn.com/cache/w824/ts/banner/9b/0e/8e/26990b2286bfb999542f8221fa5ecadd.png.jpg" },
        { url: "https://salt.tikicdn.com/cache/w824/ts/banner/be/6a/73/c35688bf41d7637bcf4b98c5a61906b3.jpg" },
        { url: "https://salt.tikicdn.com/cache/w824/ts/banner/3c/2f/c7/dc4e0889afdc8836d311ca6f140a5921.png.jpg" }
      
    ];

    const items = [
        <img src="https://icms-image.slatic.net/images/ims-web/5050417c-130b-403c-8296-82600aad18fd.jpg" onDragStart={handleDragStart} />,
        <img src="https://icms-image.slatic.net/images/ims-web/6c32db13-fb81-432e-b4db-103c63b6783f.jpg" onDragStart={handleDragStart} />,
        <img src="https://icms-image.slatic.net/images/ims-web/657faaf6-248a-4e28-8386-0aedb8377fff.jpg" onDragStart={handleDragStart} />,
      ];

    return (
        <Fragment>
            {/* <SimpleImageSlider
                width={1410}
                height={465}
                images={images}
                slideDuration= {0.5}
                showNavs={true}
                showBullets={true}
                useGPURender={true}
            /> */}

            <AliceCarousel
                mouseTracking
                items={items}
                autoPlay={true}
                autoWidth={true}
                animationDuration={2000}
                disableButtonsControls={true}
                infinite={true}
            />
        </Fragment>
    )
}

export default SliderPhoto
