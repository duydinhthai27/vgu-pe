import React from 'react';
import './searchbar.css';
import search_icon from '../Assets/Search_icon.png';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="searchs">
      <div className="search">
        <img src={search_icon} className="search_icon" alt="search" />
        <input
          type="text"
          placeholder="Find your favorite books"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
