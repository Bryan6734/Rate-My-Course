import React from "react";

// <button className="logout-btn" onClick={() => logout()}>
//   {/* {name} */}
// </button>;

function LogoutButton({ user }) {
  const logout = () => {
    localStorage.removeItem("user");
    console.log("Logging out.");
    window.location.reload();
  };

  const name = user.name.split(" ")[0];
  const picture = user.picture;

  return (
    <div className="logout-container">
      <img className="profile-pic" onClick={() => logout()} src={user.picture} alt="Image" />
    </div>
  );
}

export default LogoutButton;
