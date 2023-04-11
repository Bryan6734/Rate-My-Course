import React from "react";
import "./Menu.css";
import menuClose from "../Assets/menu-close.png";

function Menu() {
  function closeMenu() {
    document.querySelector(".menu").classList.remove("show");
    document.querySelector(".menu").classList.add("hide");
  }

  return (
    <div className="menu">
      <img className="close" src={menuClose} onClick={closeMenu} alt="" />
      <ul className="menu-links">
        <li>Home</li>
        <li>Courses</li>
        <li>Contact</li>

        <li>Mathematics</li>
        <li>Sciences</li>
        <li>English</li>
        <li>Languages</li>
        <li>History</li>
        <li>Arts</li>
      </ul>
    </div>
  );
}

export default Menu;
