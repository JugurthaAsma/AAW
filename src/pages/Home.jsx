import React from "react";
import "../styles/components/Home.css";
import hand from "../img/hand.png";

const Home = () => {
  return (
  <>
  <div class="box">
    <div class="box-content">
      <div class="title"> Bienvenue sur le read me  <img className="waving-hand" src={hand} alt="Hand" /></div>
      <p> Ici vous trouverez tous les détails de ce qui a été codé pour vous faciliter la tâche. </p>
      <div class="description">Mode visiteur (donc sans compte) </div>
        <p> En utilisant le mode non connecté, vous pourrez consulter le planning ainsi que les manches mais uniquement en mode lecture</p>
        <div class="description">En mode connecté</div>
        <p>Se connecter en mode administrateur
         Cliquer sur "LOGIN", user: admin et mdp: admin
	       Avec le mode admin vous avez tous les droits! 
        </p>

        <div class="grid_1_1">
          <div class="box">
            <div class="box-content" id="minibox">
              <div class="title">Mes passe-temps</div>
              <div class="description">Ce que je fais de mon temps libre...</div>
              <div class="grid-about"></div>
            </div>
          </div>
          <div class="left">
            <div class="box">
              <div class="box-content" id="minibox">
                <div class="title">Mes langues parlées</div>
                <div class="description">Même si ce n'est que des notions...</div>
                <div class="grid-about"></div>
              </div>
            </div>
          </div>
        </div>


    </div>
  </div>
  

  
  </>
  )
};

export default Home;
