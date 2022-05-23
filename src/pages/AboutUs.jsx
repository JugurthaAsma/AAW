import React from "react";
import hylia from "../img/hylia.png";
import jugurtha from "../img/jugurtha.png";
import "../styles/components/AboutUs.css";
import { Linkedin, Github, EnvelopeFill } from "react-bootstrap-icons";

const AboutUs = () => {
  return (
    <>
      <h1 className="text-center mt-5">About Us</h1>
      <div className="cards">
        <div className="card">
          <div className="images">
            <img className="card-img-top" src={hylia} alt="Hylia" />
          </div>
          <div className="card-body">
            <h3 className="card-title">Hylia </h3>
            <p className="card-text">Hello, i'm Hylia (AKA Hylionx!). I am in the first year of a master's degree in software design. I come from the north of France. Fries, fries, fries! </p>
          </div>
          <div className="network">
            <a href="https://fr.linkedin.com/in/hylia-boudahba-58310417b">
              <Linkedin id="icon" />
            </a>
            <a href="https://github.com/hylionx">
              <Github id="icon" />
            </a>
            <a href="mailto:hylia.boudahba@gmail.com">
              <EnvelopeFill id="icon" />
            </a>
          </div>
        </div>

        <div className="card">
          <div className="images">
            <img className="card-img-top" src={jugurtha} alt="Jugurtha" />
          </div>
          <div className="card-body">
            <h3 className="card-title">Jugurtha </h3>
            <p className="card-text">
              Hello, i'm future SERLIEN Jugurtha (AKA Jugo!). I am in the first year of a master's degree in software design. I am passionate about IT. So you're gonna have to put up with me!{" "}
            </p>
          </div>
          <div className="network">
            <a href="https://fr.linkedin.com/in/jugurtha-asma?trk=public_profile_browsemap">
              <Linkedin id="icon" />
            </a>
            <a href="https://github.com/JugurthaAsma">
              <Github id="icon" />
            </a>
            <a href="mailto:jugurtha.1703@gmail.com">
              <EnvelopeFill id="icon" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
