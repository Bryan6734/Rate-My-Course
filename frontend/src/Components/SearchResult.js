import React from "react";
import { useNavigate } from "react-router-dom";

function SearchResult({ course, index }) {
  const navigate = useNavigate();

  const handleClick = () => {
  
    navigate(`/${course.name}`);
  };

  return (
    <>
      <li key={index} onClick={() => handleClick()}>
        <div className="search-text">
          <p className="name">{course.name}</p>
          <p className="other">{course.department}</p>
        </div>
      </li>
    </>
  );
}

export default SearchResult;
