import React from "react";
import "./ReviewCard.css";

function ReviewCard({ course, review, criteria }) {
  const handleClick = () => {
    console.log("Clicked card");
  };



  return (
    <div className="review-card" onClick={() => handleClick()}>
      <div className="header-container">
        <div className="title">
          <h2>{review.title}</h2>
          <p className="details">Fall Semester 2023-2024</p>
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
                <div className="bar-fill" style={{ width: `${review[criterion] * 20}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReviewCard;
