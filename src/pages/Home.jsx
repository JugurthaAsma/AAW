import React from "react";
import "../styles/components/Home.css";
import hand from "../img/hand.png";

const Home = () => {
  return (
  <>
  <div className="box">
    <div className="box-content">
      <div className="title"> Bienvenue sur le read me  <img className="waving-hand" src={hand} alt="Hand" /></div>
      <p> Ici vous trouverez tous les détails de ce qui a été codé pour vous faciliter la tâche. </p>
      <div className="description">Mode visiteur (donc sans compte) </div>
        <p> En utilisant le mode non connecté, vous pourrez consulter le planning ainsi que les manches mais uniquement en mode lecture</p>
        <div className="description">En mode connecté</div>
        <p>Se connecter en mode administrateur  Cliquer sur "LOGIN", user: admin et mdp: admin  Avec le mode admin vous avez tous les droits! 
        </p>
        <div className="grid_1_1">
          <div className="box">
            <div className="box-content" id="minibox">
              <div className="title">Consulter la liste des personnes</div>
              <div>Avec le mode admin, vous avez la possibilité de modifier, déconnecter ou même supprimer un utilisateur. 
              Un bouton "déconnecter tout le monde" permet de déconnecter toute les personnes qui sont listées.
              Vous aurez aussi la possibilité de reecherche une personne plus facilemnt grâce à l'input de recherche.
              </div>
              <div className="grid-about"></div>
            </div>
          </div>
          <div className="left">
            <div className="box">
              <div className="box-content" id="minibox">
                <div className="title">Consulter la liste des plannings</div>
                <div>Même si ce n'est que des notions...</div>
                <div className="grid-about"></div>
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
