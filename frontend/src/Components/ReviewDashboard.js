import React, { useState, useEffect } from "react";
import "./ReviewDashboard.css";
import ReviewCard from "./ReviewCard";

function ReviewDashboard({ course }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {

    fetch(`https://rate-my-course-backend.onrender.com/reviews/course/${course._id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [course._id]);

  return (
    <div className="review-dashboard">
      {reviews.map((review, index) => {
        return <ReviewCard key={index} review={review}/>;
      })}
    </div>
  );
}

export default ReviewDashboard;
