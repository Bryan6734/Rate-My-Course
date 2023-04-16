import React, { useState, useEffect } from "react";
import "./ReviewDashboard.css";
import ReviewCard from "./ReviewCard";

function ReviewDashboard({ course }) {
  const [reviews, setReviews] = useState([]);
  const criteria = ["content", "difficulty", "workload", "pacing", "clarity", "organization"];

  useEffect(() => {
    console.log(`QUERY http://127.0.0.1:8000/reviews/course/${course._id}`);
    fetch(`http://127.0.0.1:8000/reviews/course/${course._id}`)
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
        return <ReviewCard key={index} course={course} review={review} criteria={criteria} />;
      })}
    </div>
  );
}

export default ReviewDashboard;
