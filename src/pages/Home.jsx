import React from "react";
import "../styles/components/Home.css";
import hand from "../img/hand.png";
import admin from "../img/admin.png";
import add from "../img/add.png";
import consulter from "../img/consulter.png";
import see from "../img/see.png";
import user from "../img/user.png";


const Home = () => {
  return (
  <>
  <div className="box">
    <div className="box-content">
      <div className="title"> Bienvenue sur le read me  <img className="waving-hand" src={hand} alt="Hand" /></div>
      <div className="description">Mode visiteur (donc sans compte) </div>
        <p> En utilisant le mode non connecté, vous pourrez consulter le planning ainsi que les manches mais uniquement en mode lecture</p>
        <div className="description">En mode connecté</div>
        <p id="section">Se connecter en mode administrateur <img className="waving-hand" src={admin} alt="Admin" /> </p>
        <p> Cliquer sur "LOGIN", user: admin et mdp: admin  Avec le mode admin vous avez tous les droits!  </p>
        <div className="grid_1_1">
          <div className="box">
            <div className="box-content" id="minibox">
              <div className="title">Consulter la liste des personnes <img className="waving-hand" src={consulter} alt="consulter" /></div>
              <div>Avec le mode admin, vous avez la possibilité de modifier, déconnecter ou même supprimer un utilisateur. 
              Un bouton "Disconnect everyone" permet de déconnecter toutes les personnes qui sont listées.
              Vous aurez aussi la possibilité de rechercher une personne plus facilement grâce à l'input de recherche.
              L'administrateur peut ajouter une personne à la liste.
              </div>
            </div>
          </div>
          <div className="left">
            <div className="box">
              <div className="box-content" id="minibox">
                <div className="title">Consulter la liste des plannings <img className="waving-hand" src={consulter} alt="consulter" /></div>
                <div> Vous trouverez ici les détails des plannings, composé du nom de l'événement et la date. 
                  Vous pourrez également consulter les manches auquelles l'utilisateur est inscrit. Vous aurez la possibilité de 
                   modifier ou supprimer un planning.
                  L'administrateur peut ajouter un planning.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="box-content" id="minibox">
                  <div className="title">Consulter les manches <img className="waving-hand" src={see} alt="see" /></div>
                  <div> Dans le menu, vous trouverez un onglet manches. Cet onglet permet de consulter les manches existantes.
                    L'utilisateut pourra décider de joindre une manche, la modifier ou la supprimer.
                   Rappel : Tout cela en tant qu'administrateur.
                  </div>
          </div>
        </div>


        <div className="box">
          <div className="box-content" id="minibox">
                  <div className="title">Inscriptions <img className="waving-hand" src={add} alt="add" /> </div>
                  <div> Comme dit dans le titre, on peut inscire une nouvelle personnes à un événement.
                  </div>
          </div>
        </div>
        <p id="section">Se connecter en tant qu'utilisateur <img className="waving-hand" src={user} alt="user" /> </p>
        <p> Ici, on vous indique ce qu'un utilisateur lambda qui a créé un compte au préalable, aura comme accès.
          Un utilisateur n'a aucun droit en écriture, il n'a un accès qu'en lecture.  </p>

        <div className="box">
          <div className="box-content" id="minibox">
                  <div className="title">Consultation du planning <img className="waving-hand" src={see} alt="see" /> </div>
                  <div> L'utilisateur peut regarder son planning auquel il est inscrit. Il peut consulter la manche correspondant au planning concerné.
                  </div>
          </div>
        </div>
        <div className="box">
          <div className="box-content" id="minibox">
                  <div className="title">Consultation des manches <img className="waving-hand" src={see} alt="see" /> </div>
                  <div> On peut consulter l'ensemble des manches existantes et décider de rejoindre une manche par exemple.
                  </div>
          </div>
        </div>
        <div className="box">
          <div className="box-content" id="minibox">
                  <div className="title">Consultation des inscriptions <img className="waving-hand" src={see} alt="see" /> </div>
                  <div> Toujours en mode lecture, voir l'ensemble des personnes inscrites et pour quel planning.
                  </div>
          </div>
        </div>

    </div>
  </div>
  

  
  </>
  )
};

export default Home;
