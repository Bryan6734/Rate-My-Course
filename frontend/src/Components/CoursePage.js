import React, { useState } from "react";
import "./CoursePage.css";
import ReviewDashboard from "./ReviewDashboard";

function CoursePage({ course }) {
  const [inputs, setInputs] = useState({
    title: "",
    content: 50,
    difficulty: 50,
    workload: 50,
    pacing: 50,
    clarity: 50,
    organization: 50,
    description: "",
  });
  const [charCount, setCharCount] = useState(0);
  const maxCharCount = 200;

  const showDescription = () => {
    const desc = document.querySelector(".desc");
    const descContents = desc.querySelectorAll("p");



    desc.classList.toggle("animate-in");

    // wait for animation to finish
    if (!desc.classList.contains("animate-in")) {
      setTimeout(() => {
        descContents.forEach((content) => {
          content.classList.toggle("desc-hidden");
        });
      }, 500);
    } else {
      descContents.forEach((content) => {
        content.classList.toggle("desc-hidden");
      });
    }
  };

  const showReviewForm = () => {
    const review = document.querySelector(".review-form");
    const reviewContents = review.querySelectorAll(":scope > *:not(h2)");

    if (!localStorage.getItem("user")) {
      alert("You must be logged in to submit a review");
      return;
    }

    review.classList.toggle("animate-in");

    // wait for animation to finish
    if (!review.classList.contains("animate-in")) {
      setTimeout(() => {
        reviewContents.forEach((content) => {
          content.classList.toggle("review-form-hidden");
        });
      }, 500);
    } else {
      reviewContents.forEach((content) => {
        content.classList.toggle("review-form-hidden");
      });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    if (!localStorage.getItem("user")) {
      alert("You must be logged in to submit a review");
      return;
    }

    // make sure all fields are filled out. title and descriptions should not bne empty.
    if (Object.keys(inputs).length !== 8 || inputs.title === "" || inputs.description === "") {
      alert("Please fill out all fields");
      return;
    }

    e.preventDefault();
    // Should we use ObjectId or Googleid for the review params?
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const review = { ...inputs, courseId: course._id, userId: userId };

    const reviewData = JSON.stringify(review);

    fetch("http://127.0.0.1:8000/reviews/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reviewData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Review submitted!");
      });
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

          <form onSubmit={handleSubmit} className="review-form-hidden">
            <input type="text" name="title" id="title" value={inputs.title || ""} onChange={handleChange} placeholder="Title" />

            <div className="sliders">
              <div className="slider">
                <label htmlFor="content">Content</label>

                <input type="range" name="content" id="content" value={inputs.content || ""} onChange={handleChange} />
              </div>

              <div className="slider">
                <label htmlFor="difficulty">Difficulty</label>
                <input type="range" name="difficulty" id="difficulty" value={inputs.difficulty || ""} onChange={handleChange} />
              </div>

              <div className="slider">
                <label htmlFor="workload">Workload</label>
                <input type="range" name="workload" id="workload" value={inputs.workload || ""} onChange={handleChange} />
              </div>

              <div className="slider">
                <label htmlFor="pacing">Pacing</label>
                <input type="range" name="pacing" id="pacing" value={inputs.pacing || ""} onChange={handleChange} />
              </div>

              <div className="slider">
                <label htmlFor="clarity">Clarity</label>
                <input type="range" name="clarity" id="clarity" value={inputs.clarity || ""} onChange={handleChange} />
              </div>

              <div className="slider">
                <label htmlFor="organization">Organization</label>
                <input type="range" name="organization" id="organization" value={inputs.organization || ""} onChange={handleChange} />
              </div>
            </div>

            <textarea
              name="description"
              id="description"
              placeholder="Write a little bit about your experience in this course."
              maxLength={maxCharCount}
              value={inputs.description || ""}
              onChange={(e) => {
                handleChange(e);
                setCharCount(e.target.value.length);
              }}
            ></textarea>

            <div className="review-final-row">
              <div className="buttons">
                <button type="submit">Submit</button>
                <button
                  type="reset"
                  onClick={(e) => {
                    e.preventDefault();
                    setInputs({
                      title: "",
                      content: 50,
                      difficulty: 50,
                      workload: 50,
                      pacing: 50,
                      clarity: 50,
                      organization: 50,
                      description: "",
                    });
                    setCharCount(0);
                  }}
                >
                  Reset
                </button>
              </div>

              <p className="char-count">
                {charCount}/{maxCharCount}
              </p>
            </div>
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
