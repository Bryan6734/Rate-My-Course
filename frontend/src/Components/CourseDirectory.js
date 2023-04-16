import React, { useState, useEffect } from "react";
import "./CourseDirectory.css";
import CourseDirectoryCard from "./CourseDirectoryCard";

function CourseDirectory({ courses }) {
  const [courseList, setCourseList] = useState([]);

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
    console.log(htmlCourses);
  }, [courses]);

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
          <li onClick={handleButtonClick}>Mathematics</li>
          <li onClick={handleButtonClick}>Science</li>
          <li onClick={handleButtonClick}>English</li>
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
