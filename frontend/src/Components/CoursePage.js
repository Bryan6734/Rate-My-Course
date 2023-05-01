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
  const maxCharCount = 300;

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
    e.preventDefault();
    if (!localStorage.getItem("user")) {
      alert("You must be logged in to submit a review");
      return;
    }

    if (Object.keys(inputs).length !== 8 || inputs.title === "" || inputs.description === "") {
      alert("Please fill out all fields");
      return;
    }

    const googleId = JSON.parse(localStorage.getItem("user")).googleId;
    const reviewData = JSON.stringify({ ...inputs, courseId: course._id, googleId: googleId });

    // Checks for duplicated user review and returns a promise that resolves to a boolean
    const checkUserDuplicateReviews = async () => {
      // Obtain all the reviews written by the user
      const response = await fetch(`https://rate-my-course-backend.onrender.com/reviews/user/${googleId}`);
      const allUserReviews = await response.json();

      return allUserReviews.some((review) => review.courseId === course._id);
    };

    const checkReviewProfanity = async (allReviewInfo) => {
      const list_of_text = allReviewInfo.join(" ");
      const response = await fetch(`https://www.purgomalum.com/service/containsprofanity?text=${list_of_text}`);
      const data = await response.text();

      console.log(data);
      console.log(data === "true")
      return data === "true";
    };

    // Submits a review to MongoDB and returns a promise that resolves to the response
    const submitReview = async () => {
      const response = await fetch(`https://rate-my-course-backend.onrender.com/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: reviewData,
      });

      const data = await response.json();

      console.log(response.status);
      console.log(response.statusText);

      if (response.ok) {
        alert("Review submitted successfully");
      } else {
        alert("There was an error submitting your review");
      }
    };

    checkUserDuplicateReviews().then((result) => {
      if (result) {
        alert("You have already submitted a review for this course");
      } else {
        const text_to_check = [inputs.title, inputs.description];
        checkReviewProfanity(text_to_check).then((result) => {
          if (result) {
            alert("Your review contains profanity. Please remove it and try again.");
          } else {
            submitReview();
          }
        });
      }
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
