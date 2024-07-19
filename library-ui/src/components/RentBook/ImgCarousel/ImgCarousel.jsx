import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';
import Header from '../../Main Page/Header/Header.jsx'
import './ImgCarousel.css'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import img from '../../Assets/testbook.png'
import img1 from '../../Assets/testbook.png'
import img2 from '../../Assets/testbook.png'
import img3 from '../../Assets/testbook.png'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useParams } from 'react-router-dom';

export const ImgCarousel = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    
    const [book, setBooks] = useState('');
    const { bookId } = useParams();

    useEffect(() => {
      const fetchBooks = async (accessToken) => {
        try {
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
            console.error('Access token not found in localStorage');
            return;
          }
          const response = await axios.get(`http://localhost:6868/api/books/find/${bookId}`, {
            headers: {
              'x-access-token': accessToken
            }
          });
          
          setBooks(response.data);
        } catch (error) {
          console.error('Error fetching book data:', error);
        }
      };
  
      fetchBooks();
    }, []);
    const bookimg = [book.image_url, book.image_url, book.image_url, book.image_url];

  return (
    <div id="swipebook">
        
      <Swiper
              style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff'

              }}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              <SwiperSlide>
                <img src={bookimg[0]} />
              </SwiperSlide>
              <SwiperSlide>
                <img src={bookimg[1]} />
              </SwiperSlide>
              <SwiperSlide>
                <img src={bookimg[2]} />
              </SwiperSlide>
              <SwiperSlide>
                <img src={bookimg[3]} />
              </SwiperSlide>
              
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img src={bookimg[0]} />
              </SwiperSlide>
              <SwiperSlide>
                <img src={bookimg[1]} />
              </SwiperSlide>
              <SwiperSlide>
                <img src={bookimg[2]} />
              </SwiperSlide>
              <SwiperSlide>
                <img src={bookimg[3]} />
              </SwiperSlide>
            </Swiper>
        
      </div>
  )
}
export default ImgCarousel