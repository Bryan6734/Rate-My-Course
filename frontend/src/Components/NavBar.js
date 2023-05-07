import React, { useEffect } from "react";
import ratemycourseLogo from "../Assets/ratemycourse-logo.png";
import menuIcon from "../Assets/menu-icon.png";
import Menu from "./Menu";
import "./NavBar.css";
import LoginButton from "./LoginButton";
import AccountButton from "./AccountButton";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  function openMenu() {
    document.querySelector(".menu").classList.remove("hide");
    document.querySelector(".menu").classList.add("show");
  }

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogoClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const logo = document.getElementById("logo");

    // if logo isnt laoded, keep on trying to load it
    if (!logo.complete) {
      setTimeout(() => {
        logo.src = ratemycourseLogo;
        console.log("trying to load logo");
      }, 1000);
    }
  }, []);

  return (
    <div className="nav-bar-container">
      <nav className="mini-nav-bar">
        <div className="mini-nav-links"></div>
      </nav>
      <nav className="nav-bar">
        <div className="logo">
          <img rel="preload" src={ratemycourseLogo} onClick={handleLogoClick} alt="Milton Logo" priority="high" id="logo" />
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/about-us">About</Link>

          {localStorage.getItem("user") === null ? <LoginButton></LoginButton> : <AccountButton></AccountButton>}

          <img className="open" src={menuIcon} onClick={openMenu} alt="" />
        </div>
      </nav>

      <Menu className="hide"></Menu>
    </div>
  );
}

export default NavBar;
