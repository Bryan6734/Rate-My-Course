import React from 'react'
import SearchBar from './SearchBar'
import Courses from '../courses.json'

function HomePage() {
  return (
    <>
      <section className="hero">
        <SearchBar placeholder="Rate A Course" data={Courses}></SearchBar>
      </section>
    </>
  );
}

export default HomePage