import React from "react";


function LogoutButton({ user, menuRender=false }) {
  const logout = () => {
    localStorage.removeItem("user");
    console.log("Logging out.");
    window.location.reload();
  };

  return (
    <div className="logout-container">

      {
        menuRender ?
          <button className="login-btn" onClick={() => logout()}>
            Logout
          </button>
          :
          <img className="profile-pic" onClick={() => logout()} src={user.picture} alt="Logout"/>

      }

    </div>
  );
}

export default LogoutButton;
