import React, { useState } from "react";
import "./SearchBar.css";

// Takes in two props
function SearchBar({ placeholder, data }) {

  data.sort((a, b) => (a.name > b.name) ? 1 : -1);

  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);
    const newFilter = data.filter((course) => {
      // Boolean representing if we want to show or not
      return course.name.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm.length > 0;
    }
    );
    setFilteredData(newFilter);
  }

  return (
    
    <div className="search">
      <div className="search-inputs">
        <input type="text" placeholder={placeholder} value={query} onChange={handleChange} />
        <div className="search-icon"></div>
      </div>

      {filteredData.length != 0 && (
        <div className="search-results">
          <ul>
            {filteredData.map((course, index) => (
              <li key={index}>{course.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
