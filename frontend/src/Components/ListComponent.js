import React from "react";

function ListComponent({ course, index }) {
  return (
    <>
      <li key={index}>
        <div className="search-text">
          <p className="name">{course.name}</p>
          <p className="other">{course.dept}</p>
        </div>
      </li>
    </>
  );
}

export default ListComponent;
