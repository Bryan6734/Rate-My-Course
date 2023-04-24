import React from "react";
import "./UserProfile.css";
// import ReviewCard from "./ReviewCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReviewCard from "./ReviewCard";

function UserProfile() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    graduationYear: "",
    picture: "",
  });

  const handleClick = (event, courseName) => {
    navigate("/" + courseName);
  };

  const logout = () => {
    navigate("/");
    console.log("Button clicked");
    localStorage.removeItem("user");
    // refresh
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      graduationYear: "",
      picture: "",
    });
    window.location.reload();
  };

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      alert("Please login to view your profile.");
      navigate("/");
      return;
    }

    const googleId = JSON.parse(localStorage.getItem("user")).googleId;

    // API: user w/ googleId -> reviews -> courses
    const getUserReviews = async () => {
      const userDBResponse = await fetch("http://127.0.0.1:8000/users/googleId/" + googleId);
      const userData = await userDBResponse.json();
      setUser(userData);

      const reviewsDBResponse = await fetch("http://127.0.0.1:8000/reviews/user/" + userData.googleId);

      const reviewsData = await reviewsDBResponse.json();
      const courseIds = [...new Set(reviewsData.map((review) => review.courseId))];


      const courseDBResponse = await fetch("http://127.0.0.1:8000/courses/ids/multiple?ids=" + courseIds.join(","))
      const courseData = await courseDBResponse.json();

      let reviewsWithCourses = reviewsData.map((review) => {
        const course = courseData.find((course) => course._id === review.courseId);
        return { ...review, course };
      });


   
      setReviews(reviewsWithCourses);
    };

    getUserReviews();
  }, [navigate]);

  const userPage = () => {
    return (
      <div className="user-page">
        <hr />
        <h1>Account Profile</h1>

        <div className="profile-card">
          <img src={user.picture} alt="User" />
          <div className="info">
            <div className="info-text">
              <h2>{user.firstName + " " + user.lastName}</h2>
              <p>{"Class of " + user.graduationYear}</p>
              <p>{user.email}</p>
            </div>

            <div className="buttons">
              <button className="logout btn" onClick={() => logout()}>
                Logout
              </button>
            </div>
          </div>
        </div>

        <hr />
        <div className="reviews">
          <h1>Reviews</h1>

          <div className="review-list">
            {reviews.map((review, index) => {
              return (
                <div onClick={(event) => handleClick(event, review.course.name)} key={index}>
                  <ReviewCard review={review} details={review.course.name}></ReviewCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return <>{user.firstName !== "" && userPage()}</>;
}

export default UserProfile;
