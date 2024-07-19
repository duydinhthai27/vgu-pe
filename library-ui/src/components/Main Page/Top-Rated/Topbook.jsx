import React, { useState, useEffect } from "react";
import { Navigation, A11y, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {useNavigate} from "react-router-dom";

// Import Swiper styles
import "swiper/css/bundle";


import './Topbook.css'
const Topbook = () => {
  const [topBooks, setTopBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const response = await fetch('http://127.0.0.1:6868/api/books?sort=rating_count&limit=10');
        const data = await response.json();
        setTopBooks(data);
      } catch (error) {
        console.error('Error fetching top books:', error);
      }
    };

    fetchTopBooks();
  }, []);
  const handleBookClick = (bookId) => {
    // Navigate to the book details page
    navigate(`/rentbook/${bookId}`);
  };
  return (
    <div className="App">
      <div className="top-10">
        <h1>Top rated books</h1>
      </div>
      <div className="view">
        <a href="/browsebook">View more</a>
      </div>
      <Swiper
          slidesPerView={6}
          // breakpoints={{
          //   // When window width is <= 500px
          //   1300: {
          //     slidesPerView: 2,
          //   },
          // }}
          modules={[Navigation, A11y, Autoplay, Pagination]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }}
          centeredSlides={true}
          observer={true}
        >
          {topBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <img
                src={book.image_url || '/placeholder-book-cover.jpg'}
                alt={book.title || 'Placeholder Book Cover'}
                onClick={() => handleBookClick(book.id)}
              />
              {/* <div className="title">
                <a href="">{book.title}</a>
              </div>
              <div className="author">
                <a href="">{book.authors}</a>
              </div> */}
            </SwiperSlide>
          ))}
          <div className="swiper-button-next" />
          <div className="swiper-button-prev" />
        </Swiper>
      {/* <Swiper
        slidesPerView={6}
        breakpoints={{
            // When window width is <= 500px
            1300: {
              slidesPerView: 2,
            },
          }}
        modules={[Navigation, A11y, Autoplay, Pagination]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }}
        centeredSlides={true}
        // // autoplay={true}
        observer={true}
        
      >
        
        <SwiperSlide key={1}>
          <img src={"https://ew.com/thmb/VXjN75rLOO9xspAhdZ_7P2hfO_8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/harry01english-05b4fdcc910a4ae199b34d9cb99e3db6.jpg"} alt={"oppenheimer"} />
          <div className="title">
            <a href="#">Harry Potter and the Philosopher's Stone</a>
          </div>
          <div className="author">
            <a href="#">J.K.Rowling</a>
          </div>
        </SwiperSlide>
        
        <SwiperSlide key={2}>
          <img src={"https://ew.com/thmb/VXjN75rLOO9xspAhdZ_7P2hfO_8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/harry01english-05b4fdcc910a4ae199b34d9cb99e3db6.jpg"} alt={"barbie"} />
          <div className="title">
            <a href="#">Harry Potter and the Philosopher's Stone</a>
          </div>
          <div className="author">
            <a href="#">J.K.Rowling</a>
          </div>
        </SwiperSlide>
        <SwiperSlide key={3}>
          <img src={"https://ew.com/thmb/VXjN75rLOO9xspAhdZ_7P2hfO_8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/harry01english-05b4fdcc910a4ae199b34d9cb99e3db6.jpg"} alt={"suzume"} />
        </SwiperSlide>
        <SwiperSlide key={4}>
          <img src={"https://ew.com/thmb/VXjN75rLOO9xspAhdZ_7P2hfO_8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/harry01english-05b4fdcc910a4ae199b34d9cb99e3db6.jpg"} alt={"spiderman"} />
        </SwiperSlide>
        <SwiperSlide key={5}>
          <img src={"https://ew.com/thmb/VXjN75rLOO9xspAhdZ_7P2hfO_8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/harry01english-05b4fdcc910a4ae199b34d9cb99e3db6.jpg"} alt={"spiderman"} />
        </SwiperSlide>
        <SwiperSlide key={6}>
          <img src={"https://ew.com/thmb/VXjN75rLOO9xspAhdZ_7P2hfO_8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/harry01english-05b4fdcc910a4ae199b34d9cb99e3db6.jpg"} alt={"spiderman"} />
        </SwiperSlide>
        <SwiperSlide key={7}>
          <img src={"https://ew.com/thmb/VXjN75rLOO9xspAhdZ_7P2hfO_8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/harry01english-05b4fdcc910a4ae199b34d9cb99e3db6.jpg"} alt={"spiderman"} />
        </SwiperSlide>
        <SwiperSlide key={8}>
          <img src={"https://ew.com/thmb/VXjN75rLOO9xspAhdZ_7P2hfO_8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/harry01english-05b4fdcc910a4ae199b34d9cb99e3db6.jpg"} alt={"spiderman"} />
        </SwiperSlide>
        <SwiperSlide key={9}>
          <img src={"https://ew.com/thmb/VXjN75rLOO9xspAhdZ_7P2hfO_8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/harry01english-05b4fdcc910a4ae199b34d9cb99e3db6.jpg"} alt={"spiderman"} />
        </SwiperSlide>
        <SwiperSlide key={10}>
          <img src={"https://ew.com/thmb/VXjN75rLOO9xspAhdZ_7P2hfO_8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/harry01english-05b4fdcc910a4ae199b34d9cb99e3db6.jpg"} alt={"spiderman"} />
        </SwiperSlide>
        <div className="swiper-button-next" />
        <div className="swiper-button-prev" />
      </Swiper> */}
    </div>
  )
}

export default Topbook