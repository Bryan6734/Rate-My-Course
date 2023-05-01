import React from "react";
import "./ReviewCard.css";


function ReviewCard({ review, details }) {
  const criteria = ["content", "difficulty", "workload", "pacing", "clarity", "organization"];

  const handleClick = () => {
    console.log("Clicked card");
    console.log(review)
  };

  const idToDate = (id) => {
    const date = new Date(parseInt(id.substring(0, 8), 16) * 1000);

    // return date but make the day "th"
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="review-card" onClick={() => handleClick()}>
      <div className="header-container">
        <div className="title">
          <h2>{review.title}</h2>
          <p className="details">{
            idToDate(review._id)
          }</p>
          {review.course ? <p className="details">{review.course.name}</p> : null}
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
