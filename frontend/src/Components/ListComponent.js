import React from "react";
import { useNavigate } from "react-router-dom";

function ListComponent({ course, index }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // link to course page
    // console.log(course.dept, course.name);

    // URL encode the course.name



    navigate(`/${course.name}`);
  };

  return (
    <>
      <li key={index} onClick={() => handleClick()}>
        <div className="search-text">
          <p className="name">{course.name}</p>
          <p className="other">{course.dept}</p>
        </div>
      </li>
    </>
  );
}

export default ListComponent;
