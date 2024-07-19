import React, { useState, useEffect } from 'react';
import './BookTable.css'
import axios from 'axios';
import Modal from 'react-modal';
import ManageBook from './ManageBook.jsx';
import Header from '../../Main Page/Header/Header.jsx'
import Sidebar from '../Sidebar.jsx';
const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);    

  useEffect(() => {
    const fetchBooks = async (accessToken) => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          console.error('Access token not found in localStorage');
          return;
        }
        const response = await axios.get('http://localhost:6868/api/books', {
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
  const openModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>

    <Header></Header>
    <Sidebar></Sidebar>
    <ManageBook className="managebook"
      style={
        {
          marginLeft: '100px',
          marginTop: '10vw'
        }
      }></ManageBook>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Image URL</th>
          <th>Author</th>
          <th>Genre</th>
          <th>Publication Date</th>
          <th>Edition</th>
          <th>Format</th>
          <th>Pages</th>
          <th>Rating</th>
          <th>Rating Count</th>
          <th>Review Count</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td><img src={book.image_url} alt={book.title} /></td>
            <td>{book.authors}</td>
            <td>{book.genres}</td>
            <td>{book.publicationDate}</td>
            <td>{book.edition}</td>
            <td>{book.format}</td>
            <td>{book.num_pages}</td>
            <td>{book.rating}</td>
            <td>{book.rating_count}</td>
            <td>{book.review_count}</td>
            <td>
                <button onClick={() => openModal(book)}>View Description</button>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
    <Modal
    isOpen={isModalOpen}
    onRequestClose={closeModal}
    contentLabel="Book Description"
  >
    {selectedBook && (
      <div>
        <h2>{selectedBook.title}</h2>
        <p>{selectedBook.description}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    )}
  </Modal>
</>
  );
};

export default BookTable;