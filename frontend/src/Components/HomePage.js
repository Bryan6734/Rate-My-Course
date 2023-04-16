import React from "react";
import SearchBar from "./SearchBar";

function HomePage( { courses } ) {

  return (
    <>
      <section className="hero">
        <SearchBar placeholder="Rate A Course" data={courses}></SearchBar>
      </section>
    </>
  );
}

export default HomePage;
