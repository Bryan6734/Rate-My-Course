import { useEffect } from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import NavBar from "./Components/NavBar";
import Courses from "./courses.json";


function App() {


  return (
    <div className="App">
    
        <NavBar></NavBar>

        <section className="hero">
          <div className="card">
            <SearchBar placeholder="Rate A Course" data={Courses}></SearchBar>
          </div>
      </section>
      
      


    </div>
  );
}

export default App;
