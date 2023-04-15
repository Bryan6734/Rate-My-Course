import "./App.css";
import NavBar from "./Components/NavBar";
import HomePage from "./Components/HomePage";
import { Routes, Route } from "react-router-dom";
import Course from "./Components/CoursePage";
import CourseDirectory from "./Components/CourseDirectory";
import { useEffect, useState } from "react";

function App() {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/courses")
      .then((res) => res.json())
      .then((data) => {
        console.log("ENDPOINT http://localhost:8000/courses");
        setCourses(data);
      });
  }, []);

  function createRoutes() {
    let routes = [];
    courses.forEach((course, index) => {
      routes.push(<Route key={index} path={`${course.name}`} element={<Course course={course} />}></Route>);
    });
    return routes;
  }

  return (
    <div className="App">
      <NavBar></NavBar>

      <Routes>
        <Route path="*" element={<HomePage courses={courses} />}></Route>
        <Route path="/courses" element={<CourseDirectory />}></Route>

        {createRoutes()}
      </Routes>
    </div>
  );
}

export default App;
