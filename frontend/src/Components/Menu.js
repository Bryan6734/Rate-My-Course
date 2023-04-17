import React from "react";
import "./Menu.css";
import menuClose from "../Assets/menu-close.png";
import { useNavigate } from "react-router-dom";

import LoginButton from "./LoginButton";
import AccountButton from "./AccountButton";

function Menu() {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(`/${path}`);
  };

  function closeMenu() {
    document.querySelector(".menu").classList.remove("show");
    document.querySelector(".menu").classList.add("hide");
  }

  return (
    <div className="menu hide">
      <img className="close" src={menuClose} onClick={closeMenu} alt="" />
      <ul className="menu-links">
        <hr />
        <li onClick={() => handleClick("home")}>Home</li>
        <li>{localStorage.getItem("user") ? <AccountButton user={user}menuRender={true}></AccountButton> : <LoginButton></LoginButton>}</li>
        <li onClick={() => {
          navigate("/courses")
        }}>Courses</li>
        <li>Mathematics</li>
        <li>Computer Science</li>
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
