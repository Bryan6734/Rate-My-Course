import React, { useState } from "react";
import "./CoursePage.css";
import ReviewDashboard from "./ReviewDashboard";
import ReviewRulesCard from "./ReviewRulesCard";

function CoursePage({ course }) {
  const [inputs, setInputs] = useState({
    title: "",
    content: 50,
    difficulty: 50,
    workload: 50,
    pacing: 50,
    clarity: 50,
    organization: 50,
    assignmentReview: "",
    recommendationReview: "",
    description: "",
  });

  const [recommendationCharCount, setRecommendationCharCount] = useState(0);
  const [assignmentCharCount, setAssignmentCharCount] = useState(0);
  const [reviewCharCount, setReviewCharCount] = useState(0);

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

    if (value === "\n" || value === "\r" || value === "\r\n") {
      return;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!localStorage.getItem("user")) {
      alert("You must be logged in to submit a review");
      return;
    }

    console.log(inputs);

    if (inputs.title == "" || inputs.assignmentReview == "" || inputs.recommendationReview == "" || inputs.description == "") {
      alert("Please fill out all fields");
      return;
    }

    const confirmation = document.getElementById("review-rules-card");
    confirmation.style.display = "flex";
    
    const background = document.querySelectorAll(".course-page:not(.review-rules-card) > *:not(.review-rules-card)");

    background.forEach((element) => {
      element.style.filter = "blur(5px)";
    });

  };

  return (
    <div className="course-page">
      {JSON.parse(localStorage.getItem("user")) !== null && (
        <ReviewRulesCard data={inputs} courseId={course._id} googleId={JSON.parse(localStorage.getItem("user")).googleId} />
      )}
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
            <input type="text" maxLength={50} name="title" id="title" value={inputs.title || ""} onChange={handleChange} placeholder="Title" />

            <div className="sliders">
              <div className="slider">
                <label htmlFor="content">Engagement</label>
                <div className="label-desc">
                  <p>Low</p>
                  <p>High</p>
                </div>

                <input type="range" name="content" id="content" value={inputs.content || ""} onChange={handleChange} />
              </div>

              <div className="slider">
                <label htmlFor="difficulty">Difficulty</label>
                <div className="label-desc">
                  <p>Easy</p>
                  <p>Hard</p>
                </div>
                <input type="range" name="difficulty" id="difficulty" value={inputs.difficulty || ""} onChange={handleChange} />
              </div>

              <div className="slider">
                <label htmlFor="workload">Workload</label>

                <div className="label-desc">
                  {inputs.workload < 60 && <p>{inputs.workload + " mins"}</p>}
                  {inputs.workload == 60 && <p>{inputs.workload / 60 + " hour"}</p>}
                  {inputs.workload > 60 && <p>{Math.floor(inputs.workload / 60) + " hours " + (inputs.workload - 60) + " mins"}</p>}
                </div>

                <input type="range" name="workload" id="workload" value={inputs.workload || ""} onChange={handleChange} step={10} min={0} max={100} />
              </div>

              <div className="slider">
                <label htmlFor="pacing">Pacing</label>
                <div className="label-desc">
                  <p>Slow</p>
                  <p>Fast</p>
                </div>

                <input type="range" name="pacing" id="pacing" value={inputs.pacing || ""} onChange={handleChange} />
              </div>

              {/* <div className="slider">
                <label htmlFor="clarity">Clarity</label>
                <input type="range" name="clarity" id="clarity" value={inputs.clarity || ""} onChange={handleChange} />
              </div>

              <div className="slider">
                <label htmlFor="organization">Organization</label>
                <input type="range" name="organization" id="organization" value={inputs.organization || ""} onChange={handleChange} />
              </div> */}
            </div>

            <div className="all-text-areas">
              <div className="text-area-container">
                <textarea
                  name="assignmentReview"
                  id="assignment"
                  placeholder="What was your favorite assignment? What did the work consist of?"
                  maxLength={400}
                  value={inputs.assignmentReview || ""}
                  onChange={(e) => {
                    handleChange(e);
                    setAssignmentCharCount(e.target.value.length);
                  }}
                ></textarea>
                <p className="char-count">
                  {assignmentCharCount}/{400}
                </p>
              </div>

              <div className="text-area-container">
                <textarea
                  name="recommendationReview"
                  id="recommendation"
                  placeholder="What did a typical day in class look like?"
                  maxLength={400}
                  value={inputs.recommendationReview || ""}
                  onChange={(e) => {
                    handleChange(e);
                    setRecommendationCharCount(e.target.value.length);
                  }}
                ></textarea>

                <p className="char-count">
                  {recommendationCharCount}/{400}
                </p>
              </div>
              <div className="text-area-container">
                <textarea
                  name="description"
                  id="description"
                  placeholder={"Why should someone choose to take " + course.name + "? "}
                  maxLength={500}
                  value={inputs.description || ""}
                  onChange={(e) => {
                    handleChange(e);
                    setReviewCharCount(e.target.value.length);
                  }}
                ></textarea>
                <p className="char-count">
                  {reviewCharCount}/{500}
                </p>
              </div>
            </div>

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
                      recommendationReview: "",
                      assignmentReview: "",
                      description: "",
                    });
                    setAssignmentCharCount(0);
                    setRecommendationCharCount(0);
                    setReviewCharCount(0);
                  }}
                >
                  Reset
                </button>
              </div>
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
