import React from 'react'
import './Search.css'
import search_icon from '../../Assets/Search_icon.png';
const Search = () => {
  return (
    <div className="searchs"> 
      <div className="search">
        <img src={search_icon} className="search_icon" alt="" />
        <input type="Find your favorite books" placeholder="Find your favorite books" />
      </div>
      </div>
  )
}

export default Search
