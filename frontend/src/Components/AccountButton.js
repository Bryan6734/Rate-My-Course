import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AccountButton({ user, menuRender = false }) {
  const navigate = useNavigate();

  return (
    <div className="logout-container">
      {menuRender ? (
        <button className="login-btn" onClick={() => navigate("/account")}>
          Logout
        </button>
      ) : (
        <img className="profile-pic" onClick={() => navigate("/account")} src={user.picture} alt="Account" />
      )}
    </div>
  );
}

export default AccountButton;
