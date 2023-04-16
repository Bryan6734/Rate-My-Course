import React from "react";
import "./CourseDirectoryCard.css";
import { useNavigate } from "react-router-dom";

function CourseDirectoryCard({ course }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${course.name}`);
  };

  return (
    <div className="course-card" onClick={() => handleClick()}>
      <h2>{course.name}</h2>
      <div className="details">
        {course.department !== "" && <p className="dept">{course.department}</p>}
        {course.notes !== "" && <p className="notes">{course.notes}</p>}
      </div>

      {/* <p className="card-desc">{course.desc}</p> */}
    </div>
  );
}

export default CourseDirectoryCard;
