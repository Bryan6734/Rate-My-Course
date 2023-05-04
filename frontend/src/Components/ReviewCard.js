import React from "react";
import "./ReviewCard.css";

function ReviewCard({ review, details }) {
  const criteria = ["content", "difficulty", "workload", "pacing"];

  const handleClick = () => {
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
        <div className="criterion">
          <h3>Engagement</h3>
          <div className="label-desc">
            <p className="label">Low</p>
            <p className="label">High</p>
          </div>

          <div className="bar">
            <div className="bar-fill" style={{ width: `${review["content"]}%` }}></div>
          </div>
        </div>
        <div className="criterion">
          <h3>Difficulty</h3>
          <div className="label-desc">
            <p className="label">Low</p>
            <p className="label">High</p>
          </div>

          <div className="bar">
            <div className="bar-fill" style={{ width: `${review["difficulty"]}%` }}></div>
          </div>
        </div>
        <div className="criterion">
          <h3>Workload</h3>
          <div className="label-desc">
            {review.workload < 60 && <p className="label">{review.workload + " mins"}</p>}
            {review.workload == 60 && <p className="label">{review.workload / 60 + " hour"}</p>}
            {review.workload > 60 && <p className="label">{Math.floor(review.workload / 60) + " hours " + (review.workload - 60) + " mins"}</p>}
          </div>

          <div className="bar">
            <div className="bar-fill" style={{ width: `${review["workload"]}%` }}></div>
          </div>
        </div>
        <div className="criterion">
          <h3>Pacing</h3>
          <div className="label-desc">
            <p className="label">Slow</p>
            <p className="label">Fast</p>
          </div>

          <div className="bar">
            <div className="bar-fill" style={{ width: `${review["pacing"]}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
