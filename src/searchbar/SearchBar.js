import { FaSearch } from 'react-icons/fa';
import './SearchBar.css'; // Assuming you have a CSS file for styles
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';

function SearchBar() {
  const { setSearchQuery } = useContext(SearchContext);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    setSearchQuery(input);
    navigate('/');
  };
  return (
    <div className="search-container">
       <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search"
      />
      <button className="search-button" onClick={handleSearch}>
        <FaSearch />
      </button>
    </div>
  );
}

export default SearchBar;
