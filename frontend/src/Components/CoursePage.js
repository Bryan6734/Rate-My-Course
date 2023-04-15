import React from "react";
import "./CoursePage.css";

function CoursePage({ course }) {

  const showDescription = () => {
    console.log("show")

    // select all paragraphs inside desc
    const desc = document.querySelector(".desc p");
    desc.classList.toggle("desc-hide");
  }

  return (
    <div className="course-page">
      <hr />
      <h1 className="name">{course.name}</h1>

      <div className="details">
        {course.dept !== "" && <p className="dept">{course.department}</p>}
        {course.notes !== "" && <p className="notes">{course.notes}</p>}
      </div>

      <div className="desc" onClick={() => showDescription()}>
        <h2>About This Course</h2>
        <p className="">{course.description}</p>
      </div>

      <div className="reviews">
        <h1>Student Reviews</h1>
      </div>
    </div>
  );
}

export default CoursePage;
