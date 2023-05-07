import React from "react";
import "./ReviewRulesCard.css";
import close from "../Assets/menu-close-black.png";

function ReviewRulesCard({ data, courseId, googleId }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const guideline_1 = document.getElementById("guideline-1").checked;
    const guideline_2 = document.getElementById("guideline-2").checked;
    const guideline_3 = document.getElementById("guideline-3").checked;

    if (!guideline_1 || !guideline_2 || !guideline_3) {
      alert("Please agree to all guidelines before submitting your review");
      return;
    }

    checkProfanity(data).then((containsProfanity) => {
      if (containsProfanity) {
        alert("Your review contains profanity. Please remove all profanity before submitting your review.");
        return;
      }

      checkUserDuplicates().then((hasDuplicates) => {
        if (hasDuplicates) {
          alert("You have already submitted a review for this course. Please edit your existing review instead.");
          return;
        }

        postReviewToMongoDB();
      });
    });
  };

  const postReviewToMongoDB = async () => {
    console.log("Our data to post:");
    console.log(data);

    console.log(typeof data);

    const response = await fetch(`https://rate-my-course-backend.onrender.com/reviews/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, courseId: courseId, googleId: googleId }),
    });

    // const data = await response.json();

    console.log(response.status);
    console.log(response.statusText);

    if (response.ok) {
      alert("Review submitted successfully");
    } else {
      alert("There was an error submitting your review");
    }
  };

  const handleClose = () => {
    const reviewRulesCard = document.getElementById("review-rules-card");
    reviewRulesCard.style.display = "none";

    const background = document.querySelectorAll(".course-page:not(.review-rules-card) > *:not(.review-rules-card)");

    background.forEach((element) => {
      element.style.filter = "blur(0px)";
    });
  };

  const checkUserDuplicates = async () => {
    // If at least one of the user's reviews has the same courseId as the current course, return true.
    const response = await fetch(`https://rate-my-course-backend.onrender.com/reviews/user/${googleId}`);
    const allUserReviews = await response.json();
    return allUserReviews.some((review) => review.courseId === courseId);
  };

  const checkProfanity = async (data) => {
    const unvalidatedText = data.title + " " + data.description + " " + data.recommendationReview + " " + data.assignmentReview;
    const response = await fetch(`https://www.purgomalum.com/service/containsprofanity?text=${unvalidatedText}`);
    const containsProfanity = await response.json();
    return containsProfanity;
  };

  return (
    <div className="review-rules-card" id="review-rules-card">
      <img className="close" src={close} alt="" onClick={handleClose} />

      <div className="rules-header">
        <h1>WAIT!</h1>
        <h3>Before submitting your review, please acknowledge our Community Guidelines.</h3>
      </div>

      <form className="agreements" onSubmit={handleSubmit}>
        <div className="agreement">
          <input type="checkbox" id="guideline-1" name="guideline-1" value="guideline-1"></input>
          <label htmlFor="guideline-1">No hateful language / offensive remarks targeted towards teachers, students, or other faculty members</label>
        </div>

        <div className="agreement">
          <input type="checkbox" id="guideline-2" name="guideline-2" value="guideline-2"></input>
          <label htmlFor="guideline-2">No generalizations about student experiences (use I-perspective)</label>
        </div>

        <div className="agreement">
          <input type="checkbox" id="guideline-3" name="guideline-3" value="guideline-3"></input>
          <label htmlFor="guideline-3">No links to third-party websites or promotional content</label>
        </div>

        {/* <div className="remember">
          <h3 className="remember-small">Remember...</h3>
          <h1>Teachers are HUMAN!</h1>
        </div> */}

        <p className="disclaimer">
          Reviews that violate these guidelines will be removed. Remember: the goal of this website is to provide information about{" "}
          <span className="emphasis">courses,</span> not about <span className="emphasis">teachers.</span>
        </p>
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ReviewRulesCard;
