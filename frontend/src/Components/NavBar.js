import React from "react";
import miltonLogo from "../Assets/milton-logo-final.png";
import menuIcon from "../Assets/menu-icon.png";
import Menu from "./Menu";

function NavBar() {
  function openMenu() {
    document.querySelector(".menu").classList.remove("hide");
    document.querySelector(".menu").classList.add("show");
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
          <a href="/contact">Contact</a>
          <img className="open" src={menuIcon} onClick={openMenu} alt="" />
        </div>
      </nav>

      <Menu className="hide"></Menu>
    </>
  );
}

export default NavBar;
