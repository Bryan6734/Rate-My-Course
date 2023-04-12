import React, { useState } from "react";
import "./SearchBar.css";
import ListComponent from "./ListComponent";

// Takes in two props
function SearchBar({ placeholder, data }) {
  data.sort((a, b) => (a.name > b.name ? 1 : -1));

  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);
    const newFilter = data.filter((course) => {
      // Boolean representing if we want to show or not
      return course.name.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm.length > 0;
    });
    setFilteredData(newFilter);
  };



  return (
    <div className="search">

      <div className="search-filters">

        <ul>
          <li>Math</li>
          <li>Sciences</li>
          <li>English</li>
          <li>Languages</li>
          <li>History</li>
          <li>Arts</li>
          <li>CS</li>
        </ul>
        
      </div>

      <div className="search-inputs">
        <input type="text" placeholder={placeholder} value={query} onChange={handleChange} />
      </div>

      {filteredData.length !== 0 && (
        <div className="search-results">
          <ul>
            {filteredData.map((course, index) => (
              <ListComponent course={course} key={index} index={index} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
