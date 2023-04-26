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

  const handleCourseClick = (event, otherRef = null) => {
    var dept = event.target.innerHTML;
    if (otherRef !== null) {
      dept = otherRef;
    }

    navigate(`/courses`, { state: { department: dept } });
  };

  function closeMenu() {
    document.querySelector(".menu").classList.remove("show");
    document.querySelector(".menu").classList.add("hide");
  }

  return (
    <div className="menu hide">
      <ul className="menu-links">
        <img className="close" src={menuClose} onClick={closeMenu} alt="" />
        <hr />
        <li onClick={() => handleClick("home")}>Home</li>
        <li onClick={() => handleClick("about-us")}>About Us</li>
        <li
          onClick={() => {
            navigate("/courses");
          }}
        >
          Courses
        </li>
        <li>{localStorage.getItem("user") ? <AccountButton user={user} menuRender={true}></AccountButton> : <LoginButton></LoginButton>}</li>
        <hr />
        <li onClick={handleCourseClick}>Mathematics</li>
        <li onClick={handleCourseClick}>Computer Science</li>
        <li onClick={handleCourseClick}>Science</li>
        <li onClick={handleCourseClick}>English</li>
        <li onClick={(event) => handleCourseClick(event, "Classics")}>Languages</li>
        <li onClick={(event) => handleCourseClick(event, "History & Social Sciences")}>History</li>
        <li onClick={(event) => handleCourseClick(event, "Music")}>Arts</li>
      </ul>
    </div>
  );
}

export default Menu;
