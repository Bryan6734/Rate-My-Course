import React, { useState } from "react";
import "./SearchBar.css";
import SearchResult from "./SearchResult";
import { useNavigate } from "react-router-dom";

// Takes in two props
function SearchBar({ placeholder, data }) {
  data.sort((a, b) => (a.name > b.name ? 1 : -1));

  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);
    const newFilter = data.filter((course) => {
      // Boolean representing if we want to show or not
      return course.name.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm.length > 0;
    });
    setFilteredData(newFilter);
  };

  const handleButtonClick = (event, otherRef = null) => {
    var dept = event.target.innerHTML;
    if (otherRef !== null) {
      dept = otherRef;
    }

    navigate(`/courses`, { state: { department: dept } });
  };

  return (
    <div className="search">
      <div className="search-filters">
        <ul>
          <li onClick={handleButtonClick}>Mathematics</li>
          <li onClick={handleButtonClick}>Science</li>
          <li onClick={handleButtonClick}>English</li>
          <li onClick={(event) => handleButtonClick(event, "Classics")}>Languages</li>
          <li onClick={(event) => handleButtonClick(event, "History & Social Sciences")}>History</li>
          <li onClick={(event) => handleButtonClick(event, "Music")}>Arts</li>
          <li onClick={(event) => handleButtonClick(event, "Computer Science")}>CS</li>
        </ul>
      </div>

      <div className="search-inputs">
        <input type="text" placeholder={placeholder} value={query} onChange={handleChange} />
      </div>

      {filteredData.length !== 0 && (
        <div className="search-results">
          <ul>
            {filteredData.map((course, index) => (
              <SearchResult course={course} key={index} index={index} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
