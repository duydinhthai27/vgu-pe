import React, { useState, useEffect } from 'react';
import './booklist.css';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import {useNavigate} from "react-router-dom";
const Booklist = ({ searchQuery, selectedGenre, selectedAuthor, selectedFormat }) => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        //change api
        const accessToken = localStorage.getItem('accessToken');
        const res = await axios.get('http://localhost:6868/api/books', {
          headers: {
            'x-access-token': accessToken
          }} );
        setBooks(res.data.map(book => ({
          ...book,
          availableAtLibrary: true,
          homeDelivery: true,
          showFullDescription: false
        })));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  const filteredBooks = books.filter(book => {
    const titleMatch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const authorMatch = selectedAuthor ? book.authors.toLowerCase() === selectedAuthor.toLowerCase() : true;
    //genre mactch is if selected genre are in genres of book (include)
    // like book gernes Fantasy, Young Adult, Fiction
    // user find Young Adult
    // book show, not need to exactly equal
    const genreMatch = selectedGenre 
    ? book.genres.split(',').map(genre => genre.trim().toLowerCase()).includes(selectedGenre.toLowerCase()) 
    : true;
    const formatMatch = selectedFormat ? book.format.toLowerCase() === selectedFormat.toLowerCase() : true;

    return titleMatch && authorMatch && genreMatch && formatMatch;
  });

  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleDescription = (bookId) => {
    setBooks(books.map(book =>
      book.id === bookId
        ? { ...book, showFullDescription: !book.showFullDescription }
        : book
    ));
  };

  const [displayBasic, setDisplayBasic] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null); // New state for storing selected book's ID

  const handleShowDetail = (bookId) => {
    setSelectedBookId(bookId); // Update the selected book's ID
    setDisplayBasic(true);
  };

  const handleHideDetail = () => setDisplayBasic(false);

  const selectedBook = books.find(book => book.id === selectedBookId);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const displayPages = 3;
  let startPage, endPage;

  if (totalPages <= displayPages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= Math.ceil(displayPages / 2)) {
      startPage = 1;
      endPage = displayPages;
    } else if (currentPage + Math.floor(displayPages / 2) >= totalPages) {
      startPage = totalPages - displayPages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - Math.floor(displayPages / 2);
      endPage = currentPage + Math.floor(displayPages / 2);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error: {error}
        <p>{error.message}</p>
      </div>
    );
  }
  const handleViewBook = (bookId) => {
    navigate(`/rentbook/${bookId}`);
  };
  
  return (
    <div className="booklist-container">
      {currentBooks.map((book) => (
        <form key={book.id} className="book-form">
          <div>
            <img src={book.image_url} alt={book.title} />
          </div>
          <div>
            {/* when click here -> reed book.id -> nav renting book with book.id */}
            <button onClick={() => handleViewBook(book.id)}>View Book</button>
          </div>
          <div className="hidden" >
            <input
              
              style={{ position: 'relative', top: '-80px', left: '-50px' }}
              type="checkbox"
              id={`library${book.id}`}
              name={`library${book.id}`}
              defaultChecked={book.availableAtLibrary}
              disabled
            />
            <label  style={{ position: 'relative', top: '-80px', left: '-50px' }} htmlFor={`library${book.id}`}>Available at our library</label>
          </div>
          <div className="hidden">
            <input
              style={{ position: 'relative', top: '-80px', left: '-50px' }}
              type="checkbox"
              id={`delivery${book.id}`}
              name={`delivery${book.id}`}
              defaultChecked={book.homeDelivery}
              disabled
            />
            <label style={{ position: 'relative', top: '-80px', left: '-50px' }} htmlFor={`delivery${book.id}`}>Home delivery possible</label>
          </div>
          <div>
            <h2>{book.title}</h2>
          </div>
          <div>
            <h3>{book.authors}</h3>
          </div>
          <div>
            <h4>Genres: {book.genres}</h4>
            </div>
          <div>
            {book.showFullDescription ? (
              <p>{book.description}</p>
            ) : (
              <p>{book.description.slice(0, 400)}... <a href="#" onClick={(e) => { e.preventDefault(); handleShowDetail(book.id)  }}>
                  Show More
                  </a></p>
              
            )}
             
          </div>
        </form>
      ))}
      <Dialog modal={false} visible={displayBasic} style={{ width: '50vw' }} onHide={handleHideDetail}>
            {selectedBook && (
              <div>
                <h2>{selectedBook.title}</h2>
                <p>{selectedBook.description}</p>
              </div>
            )}
      </Dialog>
      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}>&lt;</button>
        {startPage !== 1 && <button onClick={() => paginate(1)}>1</button>}
        {startPage !== 1 && <span className="ellipsis">...</span>}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
          <button
            key={startPage + i}
            onClick={() => paginate(startPage + i)}
            className={currentPage === startPage + i ? 'active' : ''}
          >
            {startPage + i}
          </button>
        ))}
        {endPage !== totalPages && <span className="ellipsis">...</span>}
        {endPage !== totalPages && <button onClick={() => paginate(totalPages)}>{totalPages}</button>}
        <button onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}>&gt;</button>
      </div>
    </div>
  );
};

export default Booklist;
