import React from "react";
import Melvin from "../Components/Melvin.png";

function AboutUsPage() {
  return (
    <div>
      <div>
        <h1>My Name</h1>
        <img src="path/to/my/photo.jpg" alt="Bryan's Photo" />
        <h2>About Me</h2>
        <p>Some information about me.</p>
      </div>
      <div>
        <h1>Your Name</h1>

        <img src={Melvin} alt="Melvin's Photo" />
        <h2>About You</h2>
        <p>
          Melvin Joseph '24 is a junior at Milton Academy. He is currently taking
          Adv CS: Applications and as a co-developer, he collaborated in
          brainstorming this website while focusing on the backend. Some of his
          interests include economics, speech, and personal health, and in his
          free time, he enjoys reading, making websites, and traveling.
        </p>
      </div>
    </div>
  );
}

export default AboutUsPage;
