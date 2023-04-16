import React from "react";
import "./CoursePage.css";
import ReviewDashboard from "./ReviewDashboard";

function CoursePage({ course }) {
  const desc = document.querySelector(".desc");
  const descContents = document.querySelector(".desc-hidden");

  const review = document.querySelector(".review-form");
  const reviewContents = document.querySelector(".review-form-hidden");

  const showDescription = () => {
    console.log("Animating desc");

    desc.classList.toggle("animate-in");

    // wait for animation to finish
    if (!desc.classList.contains("animate-in")) {
      setTimeout(() => {
        descContents.classList.toggle("desc-hidden");
      }, 500);
    } else {
      descContents.classList.toggle("desc-hidden");
    }
  };

  const showReviewForm = () => {
    console.log("Showing review form");

    if (!localStorage.getItem("user")) {
      alert("You must be logged in to submit a review");
      return;
    }

    review.classList.toggle("animate-in");

    // wait for animation to finish
    if (!review.classList.contains("animate-in")) {
      setTimeout(() => {
        reviewContents.classList.toggle("review-form-hidden");
      }, 500);
    } else {
      reviewContents.classList.toggle("review-form-hidden");
    }
  };

  return (
    <div className="course-page">
      <hr />
      <h1 className="name">{course.name}</h1>

      <div className="details">
        {course.dept !== "" && <p className="dept">{course.department}</p>}
        {course.notes !== "" && <p className="notes">{course.notes}</p>}
      </div>

      <div className="dropdowns">
        <div className="desc">
          <h2 onClick={() => showDescription()}>About This Course</h2>
          <p className="desc-hidden">{course.description}</p>
        </div>

        <div className="review-form">
          <h2 onClick={() => showReviewForm()}>Submit Your Review</h2>

          <form action="" className="review-form-hidden">
            <input type="text" name="title" id="title" placeholder="Title" />
          </form>
        </div>
      </div>

      <div className="reviews">
        <h1>Student Reviews</h1>

        <ReviewDashboard course={course}></ReviewDashboard>
      </div>
    </div>
  );
}

export default CoursePage;
