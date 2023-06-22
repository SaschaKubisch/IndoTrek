import React from 'react';
import './About.css';

// You can replace these with actual images and LinkedIn URLs
const team = [
  {
    name: "Team Member 1",
    img: "path-to-image1.jpg",
    linkedIn: "https://www.linkedin.com/in/member1/"
  },
  {
    name: "Team Member 2",
    img: "path-to-image2.jpg",
    linkedIn: "https://www.linkedin.com/in/member2/"
  },
  {
    name: "Team Member 3",
    img: "path-to-image3.jpg",
    linkedIn: "https://www.linkedin.com/in/member3/"
  }
];

const About = () => {
  return (
    <div className="about">
      <h1 className="about-title">About Us</h1>

      <section className="about-purpose">
        <h2>Our Purpose</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, libero ut facilisis tincidunt, lectus massa gravida leo...</p>
      </section>

      <section className="about-team">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {team.map((member, index) => (
            <div className="team-member" key={index}>
              <img src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              <a href={member.linkedIn} target="_blank" rel="noreferrer">Connect on LinkedIn</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
