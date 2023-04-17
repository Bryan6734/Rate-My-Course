import React from "react";
import "./UserProfile.css";
import { useState, useEffect } from "react";

function UserProfile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const googleId = JSON.parse(localStorage.getItem("user")).googleId;

    fetch("http://127.0.0.1:8000/users/googleId/" + googleId)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        console.log("API data", data);
      });
  }, []);

  return (
    <div className="user-page">
      <hr />
      <h1>Account Profile</h1>

      <div className="profile-card">
        <img src={user.picture} alt="User" />
        <div className="info">
          <h2>{user.name}</h2>
          <div className="details">
            <p>{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
