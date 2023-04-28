import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AccountButton({ menuRender = false }) {

  const navigate = useNavigate();
  const [picture, setPicture] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    setPicture(user.picture);
    if (user) {
      setPicture(user.picture);
      const profilePic = document.querySelector(".profile-pic");
      profilePic.src = user.picture;

    }
  }, [])


  return (
    <div className="logout-container">
      {menuRender ? (
        <button className="login-btn" onClick={() => navigate("/account")}>
          Logout
        </button>
      ) : (
          <img className="profile-pic" src={ picture } onClick={() => navigate("/account")}  alt="User" />
      )}
    </div>
  );
}

export default AccountButton;
