import React, { useState } from 'react';

import Searchbar from './searchbar.jsx';
import Control from './control.jsx'
import Booklist from './booklist.jsx';

import Contact from '../Main Page/PageEnd/Contact.jsx';
import Header from '../Main Page/Header/Header.jsx';
import Final from '../Main Page/PageEnd/Final.jsx';
function BrowseBook() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="browsebook">
      <Header />
      <Searchbar value={searchQuery} onChange={handleSearchChange} />
      <section id="main">
        <Booklist
          searchQuery={searchQuery}
          selectedGenre={selectedGenre}
          selectedAuthor={selectedAuthor}
          selectedFormat={selectedFormat}
        />
        <Control
          setSelectedGenre={setSelectedGenre}
          setSelectedAuthor={setSelectedAuthor}
          setSelectedFormat={setSelectedFormat}
        />
      </section>
        
      <Contact />
      <Final />
      
    </div>
  );
}

export default BrowseBook;

