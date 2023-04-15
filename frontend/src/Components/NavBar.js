import React, { useEffect, useState } from "react";
import miltonLogo from "../Assets/milton-logo-final.png";
import menuIcon from "../Assets/menu-icon.png";
import Menu from "./Menu";
import "./NavBar.css";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google"

function NavBar() {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});

  function openMenu() {
    document.querySelector(".menu").classList.remove("hide");
    document.querySelector(".menu").classList.add("show");
  }

  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log("Success", response);
      getUser(response.access_token);

      
    },
    onFailure: (response) => console.error(response),
  });



  const logout = () => {
    setUser({});

  }

  function getUser(accessToken) {
    fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      });
  }

  


  return (
    <>
      <nav className="mini-nav-bar">
        <div className="mini-nav-links"></div>
      </nav>
      <nav className="nav-bar">
        <div className="logo">
          <img src={miltonLogo} alt="Milton Logo" />
        </div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/courses">Courses</a>

          
          <button className="login-btn" onClick={() => login()}>Login</button>
          <button className="logout-btn btn-hide" onClick={() => logout()}>Logout</button>


          {/* <a href="/" className="login-btn" onClick={() => login()}>Login</a>
          <a href="/" className="logout-btn" onClick={() => logout()}>Logout</a> */}

          <img className="open" src={menuIcon} onClick={openMenu} alt="" />
        </div>
      </nav>

      <Menu className="hide"></Menu>
    </>
  );
}

export default NavBar;
