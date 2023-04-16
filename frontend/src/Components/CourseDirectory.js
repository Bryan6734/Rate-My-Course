import React from "react";
import "./CourseDirectory.css";
import CourseDirectoryCard from "./CourseDirectoryCard";


function CourseDirectory( { courses }) {
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
          <h1 className="dept-header">{dept}</h1>
          <ul className="course-list">{generateCourses(dept)}</ul>
        </div>
      );
    });

    return list;
  }

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
          <li>Math</li>
          <li>Sciences</li>
          <li>English</li>
        </ul>
        <ul>
          <li>Languages</li>
          <li>History</li>
          <li>Arts</li>
          <li>CS</li>
        </ul>
      </div>

      {generateList()}

      {/* <ul className="course-list">{generateList()}</ul> */}
    </div>
  );
}

export default CourseDirectory;
