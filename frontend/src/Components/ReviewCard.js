import React from "react";
import "./ReviewCard.css";

function ReviewCard({ review, details }) {
  const criteria = ["content", "difficulty", "workload", "pacing", "clarity", "organization"];

  const handleClick = () => {
    console.log("Clicked card");
  };

  return (
    <div className="review-card" onClick={() => handleClick()}>
      <div className="header-container">
        <div className="title">
          <h2>{review.title}</h2>
          <p className="details">{details}</p>
        </div>
        <div className="learn-more">?</div>
      </div>

      <div className="info">
        <p>{review.description}</p>
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
