import React from 'react'
import './Slide.scss'
 import Slider from 'react-slick';
   import 'slick-carousel/slick/slick.css';
   import 'slick-carousel/slick/slick-theme.css';

const Slide = ({children,slidesToShow,slidesToScroll}) => {
   const settings = {
           dots: true,
           infinite: true,
           speed: 500,
           slidesToShow: slidesToShow,
           slidesToScroll: slidesToScroll,
       };
  return (
    <div className='slide'>
        <div className="container">
            <Slider {...settings} >
               {children}
            </Slider>
        </div>
    </div>
  )
}

export default Slide