import React, { useState, useEffect, useLayoutEffect } from "react";
import "./CourseDirectory.css";
import CourseDirectoryCard from "./CourseDirectoryCard";
import { useLocation } from "react-router-dom";

function CourseDirectory({ courses }) {
  const [courseList, setCourseList] = useState([]);
  const location = useLocation();

  const handleButtonClick = (event, otherRef = null) => {
    const dept = event.target.innerHTML;

    var deptRef = document.getElementById(dept);
    if (deptRef === null) {
      deptRef = document.getElementById(otherRef);
    }

    deptRef.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Returns all course components matching a given department
    function generateCourses(dept) {
      let list = [];

      courses.forEach((course, index) => {
        if (course.department === dept) {
          list.push(
            <li key={index}>
              <CourseDirectoryCard key={index} course={course} />
            </li>
          );
        }
      });

      return list;
    }

    // Returns all department components
    function generateList() {
      const departments = [
        "English",
        "History & Social Sciences",
        "Mathematics",
        "Science",
        "Computer Science",
        "Classics",
        "Chinese",
        "French",
        "Spanish",
        "Music",
        "Performing Arts",
        "Visual Arts",
      ];

      let list = [];

      departments.forEach((dept, index) => {
        list.push(
          <div key={index}>
            <hr />
            <h1 className="dept-header" id={dept}>
              {dept}
            </h1>
            <ul className="course-list">{generateCourses(dept)}</ul>
          </div>
        );
      });

      return list;
    }

    const htmlCourses = generateList();

    setCourseList(htmlCourses);
  }, [courses]);

  useEffect(() => {
    // how to check if the state contains a department?

    if (location.state !== null) {
      const interval = setInterval(() => {
        var deptRef = document.getElementById(location.state.department);
        if (deptRef !== null) {
          deptRef.scrollIntoView({ behavior: "smooth" });
          clearInterval(interval);
        }
      }, 200);
    } else {
    }
  }, [location.state]);

  return (
    <div className="course-page">
      <hr />
      <h1>Course Catalog</h1>
      <p>
        This catalogue holds within its pages myriad opportunities for you as a scholar. The courses described enrich the Milton Academy curriculum,
        and I encourage you to take your time as you read about and consider the offerings you’ll find here.
      </p>
      <p>
        The various disciplines will allow you to cultivate a passion, explore a new interest, and examine different perspectives. Course selection is
        an opportunity for you to build a program that complements your interests in the classroom, your activities on Milton’s campus, and the
        ambitions you have for the future.
      </p>

      <div className="search-buttons">
        <ul>
          <li id="Mathematics-btn" onClick={handleButtonClick}>
            Mathematics
          </li>
          <li id="Science-btn" onClick={handleButtonClick}>
            Science
          </li>
          <li id="English-btn" onClick={handleButtonClick}>
            English
          </li>
        </ul>
        <ul>
          <li onClick={(event) => handleButtonClick(event, "Classics")}>Languages</li>
          <li onClick={(event) => handleButtonClick(event, "History & Social Sciences")}>History</li>
          <li onClick={(event) => handleButtonClick(event, "Music")}>Arts</li>
          <li onClick={(event) => handleButtonClick(event, "Computer Science")}>CS</li>
        </ul>
      </div>

      {courseList}
    </div>
  );
}

export default CourseDirectory;
