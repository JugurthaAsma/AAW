import React from "react";
import img from "../img/hylia.png";
import img2 from "../img/jugurtha.png"
import "../styles/components/Contact.css"
import {Linkedin} from "react-bootstrap-icons"
import {Github} from "react-bootstrap-icons"
import {Google} from "react-bootstrap-icons"

const Contact = () => {
  return (
    <>
      <h1 className="text-center mt-5">About us</h1>
      <div className="cards">
        <div class="card"  >
          <div className="images">
          <img class="card-img-top" src={img}  alt="Hylia"/>
          </div>
          <div class="card-body">
            <h5 class="card-title">Hylia </h5>
            <p class="card-text">Hello, i'm Hylia and my surname is Hylionx!
            I am in the first year of a master's degree in software design. I come from the north of France.
            Fries, fries, fries!  </p>
          </div>
          <div className="network">
               <a href="https://fr.linkedin.com/in/hylia-boudahba-58310417b"> <Linkedin id="icon"/></a>
               <a href="https://github.com/hylionx"> <Github id="icon"/></a>
               <a href="mailto:hylia.boudahba@gmail.com"> <Google id="icon"/></a>
          </div>
        </div>

        <div class="card"  >
          <div className="images">
          <img class="card-img-top" src={img2}  alt="Jugurtha"/>
          </div>
          <div class="card-body">
            <h5 class="card-title">Jugurtha </h5>
            <p class="card-text">Hello, i'm Jugurtha and my surname is Jugo! 
              I am in the first year of a master's degree in software design.
              I am passionate about computers.
              and future SERLIEN ...
              So you're gonna have to put up with me! </p>
              
          </div>
          <div className="network">
               <a href="https://fr.linkedin.com/in/jugurtha-asma?trk=public_profile_browsemap"><Linkedin id="icon"/></a> 
               <a href="https://github.com/JugurthaAsma"> <Github id="icon"/></a>
               <a href="mailto:jugurtha.1703@gmail.com"><Google id="icon"/></a>
          </div>
        </div>
      </div>
    </>
  )
};

export default Contact;
