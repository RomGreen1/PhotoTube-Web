import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css'; // Assuming you have a CSS file for styles
import {useRef} from 'react'; 

function SearchBar({doSearch}) {
    const searchBox = useRef(null);
    const search = function(){
        doSearch(searchBox.current.value);
    }
  return (
    <div className="search-container">
      <input type="text"  ref={searchBox}  className="search-input" placeholder="Search" />
      <button className="search-button" onClick={search}>
        <FaSearch />
      </button>
    </div>
  );
}

export default SearchBar;
