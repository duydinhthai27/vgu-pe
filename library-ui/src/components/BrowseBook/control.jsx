import React, { useState, useEffect } from 'react';
import './control.css';
import back_icon from '../Assets/back_icon.png';
import axios from 'axios';
import Search from '../Assets/Search_icon.png';

const Control = ({ setSelectedFormat, setSelectedGenre, setSelectedAuthor }) => {
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [formats, setFormats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setSelectedAuthor(event.target.value);
  };

  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:6868/api/books/genres");
        if (res.data && Array.isArray(res.data)) {
          setGenres(res.data);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:6868/api/books/authors");
        if (res.data && Array.isArray(res.data)) {
          setAuthors(res.data);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  useEffect(() => {
    const fetchFormats = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:6868/api/books/formats");
        if (res.data && Array.isArray(res.data)) {
          setFormats(res.data);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchFormats();
  }, []);

  return (
    <div className="control-container">
      <div className='ControlTitle'>
        <h1><img src={Search} alt="Search Icon" className="search-icon" />SHORT KEY <img src={Search} alt="Search Icon" className="search-icon" /></h1>
      </div>
      <div className='format'>
        
        <p>Format</p>
        <div className='format-select'>
          <select onChange={handleFormatChange}>
            <option value="">Select Format</option>
            {formats.map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='genres'>
        
        <span>Genres</span>
        <div className='genres-select'>
          <select onChange={handleGenreChange}>
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='author'>
        
        <span>Author/Creator</span>
        <div className='author-select'>
          <select onChange={handleAuthorChange}>
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Control;
