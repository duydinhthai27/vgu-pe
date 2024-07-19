import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import Slider from './Slider.jsx'
import './Swipe.css'
import slides from './mock.json';
const Swipe = () => {
  return (
    <div className="heroswipe">
        <Slider slides = {  slides}></Slider>
    </div>
    
  )
}

export default Swipe