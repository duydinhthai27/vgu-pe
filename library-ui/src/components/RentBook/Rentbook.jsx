import React, { useRef, useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Toast } from 'primereact/toast';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import RentService from "../../services/rent.service";
import ImgCarousel from './ImgCarousel/ImgCarousel.jsx';
import Header from '../Main Page/Header/Header.jsx';
import star from '../Assets/star.png';
import './Rentbook.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const Rentbook = () => {
  const [date, setDate] = useState(null);
  const op = useRef(null);
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const buttonEl = useRef(null);
  const { bookId } = useParams();
  const [book, setBook] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
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

        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleRent = async (e) => {
    try {
      const idBookInt = parseInt(bookId, 10);
      const response = await RentService.borrow({ books: [{ id_book: idBookInt, Return_Date: date }] });

      if (response.status === 200) {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have rented a book successfully!', life: 3000 });
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'Please login to rent a book!', life: 3000 });
      } else {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error occurred', life: 3000 });
      }
    }
  };

  const accept = () => {
    handleRent();
  };

  const reject = () => {
    // toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  };

  return (
    <div>
      <ImgCarousel />
      <Header />
      <div className="book-title">
        <h1>{book.title}</h1>
        <div className="book-author">
          {/* <a href="#">{book.authors}</a> */}
          <div className="vertical-line"></div>
          <div className="rating">
            {/* <p>5.0</p> */}
            {/* <img src={} alt="" /> */}
          </div>
          <div className="book-details">
            <p><span className="detail-title">Title: </span> <span className="detail-content">{book.title}</span></p>
            <p><span className="detail-title">Author: </span> <span className="detail-content">{book.authors}</span></p>
            <p><span className="detail-title">Description: </span> <span className="detail-content">{book.description}</span></p>
            <p><span className="detail-title">Format: </span> <span className="detail-content">{book.format}</span></p>
            <p><span className="detail-title">Number of Pages: </span> <span className="detail-content">{book.num_pages}</span></p>
            <p><span className="detail-title">Rating: </span> <span className="detail-content">{book.rating}</span></p>
            <p><span className="detail-title">Rating Count: </span> <span className="detail-content">{book.rating_count}</span></p>
            <p><span className="detail-title">Review Count: </span> <span className="detail-content">{book.review_count}</span></p>
            <p><span className="detail-title">Genres: </span> <span className="detail-content">{book.genres}</span></p>
          </div>

          
        </div>
        {/* <div className="horizontal-line"></div> */}
          <div className="return-date"></div>
        
        <div className="rent">
          <Button className="Rentbutton" type="button" label="Image" onClick={(e) => op.current.toggle(e)}>
            <p>Rent</p>
          </Button>
          <OverlayPanel ref={op}>
            <p>Return Date</p>

            <Calendar value={date} onChange={(e) => setDate(e.value)} dateFormat="dd/mm/yy" />
            <Toast className="confirmbutton" ref={toast} />
            <ConfirmPopup target={buttonEl.current} visible={visible} onHide={() => setVisible(false)}
                message="Are you sure you want to proceed?" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
            <div className="card">
                <Button className="confirmbutton" ref={buttonEl} onClick={() => setVisible(true)} icon="pi pi-check" label="Confirm" />
            </div>
          </OverlayPanel>
        </div>
      </div>
    </div>
  );
};

export default Rentbook;
