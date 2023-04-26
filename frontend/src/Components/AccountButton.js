import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AccountButton({ menuRender = false }) {

  const navigate = useNavigate();


  return (
    <div className="logout-container">
      {menuRender ? (
        <button className="login-btn" onClick={() => navigate("/account")}>
          Logout
        </button>
      ) : (
        <img className="profile-pic" onClick={() => navigate("/account")}  alt="User" />
      )}
    </div>
  );
}

export default AccountButton;
