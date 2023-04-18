import "./App.css";
import NavBar from "./Components/NavBar";
import HomePage from "./Components/HomePage";
import { Routes, Route } from "react-router-dom";
import Course from "./Components/CoursePage";
import CourseDirectory from "./Components/CourseDirectory";
import UserProfile from "./Components/UserProfile";
import { useEffect, useState } from "react";

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      });
  }, []);
  

  return (
    <div className="App">
      <NavBar></NavBar>

      <Routes>
        <Route path="*" element={<HomePage courses={courses} />}></Route>
        <Route path="/courses" element={<CourseDirectory courses={courses} />}></Route>
        <Route path="/account" element={<UserProfile />}></Route>

        {courses.map((course, index) => (
          <Route
            key={index}
            path={"/" + course.name}
            element={<Course course={course} />}
          ></Route>
        ))}


      </Routes>
    </div>
  );
}

export default App;
