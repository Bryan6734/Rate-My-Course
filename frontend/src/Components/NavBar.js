import React from "react";
import miltonLogo from "../Assets/milton-logo-final.png";
import menuIcon from "../Assets/menu-icon.png";
import Menu from "./Menu";
import "./NavBar.css";
import LoginButton from "./LoginButton";
import AccountButton from "./AccountButton";
import { Link } from "react-router-dom";

function NavBar() {

  function openMenu() {
    document.querySelector(".menu").classList.remove("hide");
    document.querySelector(".menu").classList.add("show");
  }

  const user = JSON.parse(localStorage.getItem("user"));


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
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>

          {localStorage.getItem("user") ? (

            <AccountButton user={user}></AccountButton>
          ) : (
            <LoginButton></LoginButton>
          )}

          <img className="open" src={menuIcon} onClick={openMenu} alt="" />
        </div>
      </nav>

      <Menu className="hide" ></Menu>
    </>
  );
}

export default NavBar;
