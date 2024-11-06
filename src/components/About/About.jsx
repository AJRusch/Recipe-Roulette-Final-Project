import "./About.css";

function About() {
  return (
    <section className="about">
      <div className="about__background">
        <h2 className="about__title">
          Here is some info about the author of this website:
        </h2>
        <div className="about__author-box">
          <p className="about__author">Website Author: Austin Rusch</p>
          <p className="about__author-story">
            Hello, and welcome to my recipe website. I made this website out of
            the love I have for cooking. I consider myself to be a self-taught
            chef.I love collecting recipes and cooking for my family. I wanted
            to create a site that would allow you to search for a recipe or
            specific food and have it return to you a bunch of different
            results. I would like to add on to this website in the future and
            implement the ability to label and section recipes based on what
            kind of recipe they are and what time of day you would make it.{" "}
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
