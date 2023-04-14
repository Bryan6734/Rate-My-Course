import "./App.css";
import NavBar from "./Components/NavBar";
import HomePage from "./Components/HomePage";
import { Routes, Route } from "react-router-dom";
import Course from "./Components/CoursePage";
import Courses from "../src/milton-courses-formatted.json";
import CourseDirectory from "./Components/CourseDirectory";

function App() {






  function createRoutes() {
    let routes = [];
    Courses.forEach((course, index) => {
      routes.push(<Route key={index} path={`${course.name}`} element={<Course course={course} />}></Route>);
    });
    return routes;
  }

  return (

    <div className="App">
      <NavBar></NavBar>

      <Routes>
        <Route path="*" element={<HomePage />}></Route>
        <Route path="/courses" element={<CourseDirectory />}></Route>

        {createRoutes()}
      </Routes>
    </div>
  );
}

export default App;
