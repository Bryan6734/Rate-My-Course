import "./App.css";
import NavBar from "./Components/NavBar";
import HomePage from "./Components/HomePage";
import { Routes, Route } from "react-router-dom";
import CoursesPage from "./Components/CoursesPage";
import Course from "./Components/Course";
import Courses from "../src/milton-courses-formatted.json"

function App() {


  function createRoutes() {
    let routes = []
    Courses.forEach((course, index) => {

      console.log("cr", index, course.name)

      routes.push(<Route key={index} path={`${course.name}`} element={<Course course={course} />}></Route>)
      
    })
    return routes
  }
  

  return (
    <div className="App">
      <NavBar></NavBar>

      <Routes>

        <Route path="*" element={<HomePage />}></Route>
        <Route path="/courses" element={<CoursesPage />}></Route>

        {createRoutes()}
        

        
      </Routes>
    </div>
  );
}

export default App;
