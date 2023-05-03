import React from "react";
import "./ReviewCard.css";

function ReviewCard({ review, details }) {
  const criteria = ["content", "difficulty", "workload", "pacing"];

  const handleClick = () => {
    console.log("Clicked card");
    console.log(review);
  };

  const idToDate = (id) => {
    const date = new Date(parseInt(id.substring(0, 8), 16) * 1000);

    // return date but make the day "th"
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="review-card" onClick={() => handleClick()}>
      <div className="review-text">
        <div className="header-container">
          <div className="title">
            <h2>{review.title}</h2>
            <p className="details">{idToDate(review._id)}</p>
            {review.course ? <p className="details">{review.course.name}</p> : null}
          </div>
          <div className="learn-more">?</div>
        </div>

        <div className="info">
          {review.assignmentReview && (
            <div className="text-review">
              <h3>What was your favorite assignment?</h3>
              <p>{review.assignmentReview}</p>
            </div>
          )}

          {review.recommendationReview && (
            <div className="text-review">
              <h3>What does a typical day look like?</h3>
              <p>{review.recommendationReview}</p>
            </div>
          )}

          {review.description && (
            <div className="text-review">
              <h3>Why should you take this course?</h3>
              <p>{review.description}</p>
            </div>
          )}
        </div>
      </div>
      <div className="criteria">
        {criteria.map((criterion, index) => {
          return (
            <div key={index} className="criterion">
              <h3>{criterion.charAt(0).toUpperCase() + criterion.slice(1)}</h3>

              <div className="bar">
                <div className="bar-fill" style={{ width: `${review[criterion]}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReviewCard;
