import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import xdd from '../../Assets/Slide/xdd.png';
import ddx from '../../Assets/Slide/ddx.png';

import 'swiper/swiper-bundle.css';

const Slider = ({slides}) => {
  return (
    <Swiper
    // install Swiper modules
    modules={[Navigation, Pagination, Scrollbar, A11y]}
    spaceBetween={50}
    slidesPerView={1}
    loop={true}
    navigation={true}
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}
  >
    {slides.map((slide) =>(
        <SwiperSlide key={slide.image}>
            <img src={slide.image} alt={slide.title} />
        </SwiperSlide>
    ))}
    
    
   
  </Swiper>
  )
}

export default Slider