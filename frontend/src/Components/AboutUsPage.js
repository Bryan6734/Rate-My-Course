import React from "react";
import Melvin from "../Assets/Melvin.png";
import Bryan from "../Assets/Bryan.png";
import "./AboutUsPage.css";

function AboutUsPage() {
  return (
    <div className="about-us-page">
      <div className="about-us-info">
        <hr />
        <h1>About Us</h1>
        <p>
          When course selection rolls around, many students are often overwhelmed with the number of choices provided in the Course Catalog. As a
          result, students may end up taking courses that aren't what they expected or don't fit their interests.
        </p>
        <p>
          Our goal is to provide a helpful and informative platform through which students can share their experiences on courses they've taken at
          Milton. We want to encourage students to take courses that both challenge and interest them, and by helping students make informed
          decisions, we hope to make the course selection process less stressful and more enjoyable.
        </p>
      </div>

      <section className="about-us-team">
        <hr />
        <h1>Our Team</h1>

        <div className="developers">
          <div className="developer">
            <img src={Bryan} alt="Bryan's Photo" />

            <div className="title-info">
              <h2>Bryan Sukidi</h2>
              <h3>
                <span>Fullstack Developer</span>
              </h3>
            </div>

            <div className="title-desc">
              <p>
                Hey everyone! I'm{" "}
                <a target="_blank" href="https://bryansukidi.com">
                  Bryan Sukidi
                </a>{" "}
                '24 and I'm a junior at Milton Academy. As a co-developer of Rate My Course, I built the frontend website and helped develop some of
                the backend. I'm interested in computer science to explore the intersection between technology and social good. In my free time, I
                love rock climbing and playing the guitar!
              </p>
              <p className="email">
                <span>bryan_sukidi24@milton.edu</span>
              </p>
            </div>
            <p></p>
          </div>
          <div className="developer">
            <img src={Melvin} alt="Melvin's Photo" />
            <div className="title-info">
              <h2>Melvin Joseph</h2>
              <h3>
                <span>Backend Developer</span>
              </h3>
            </div>

            <div className="title-desc">
              <p>
                Melvin Joseph '24 is a junior at Milton Academy. He is currently taking Adv CS: Applications and as a co-developer, he collaborated in
                brainstorming this website while focusing on the backend. Some of his interests include economics, speech, and personal health, and in
                his free time, he enjoys reading, making websites, and traveling.
              </p>
              <p className="email"><span>melvin_joseph24@milton.edu</span></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUsPage;
