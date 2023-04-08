
import "./App.css";
import SearchBar from "./Components/SearchBar";
import Courses from "./courses.json";

function App() {
  // When the API is set up, we can fetch from the API.


  return (
    <div className="App">
      {/* <div className="nav-bar"></div> */}
      <h1>Rate My Course</h1>
      <div className="search-bar">
        <SearchBar placeholder="Find a Course" data={Courses}></SearchBar>
      </div>
    </div>
  );
}

export default App;
