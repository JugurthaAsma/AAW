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
        <p id="section">Se connecter en tant qu'utilisateur <img className="waving-hand" src={user} alt="user" /> </p>
        <p> Ici, on vous indique ce qu'un utilisateur lambda, qui a créé un compte au préalable, aura comme accès.
          Un utilisateur n'a aucun droit en écriture, il a seulement un accès en lecture. Pour se connecter en tant qu'utilisateur, vous devez créer un compte 
          dans le menu "sign up"  en mettant nom et prénom, puis la connexion se fera automatiquement. Si vous décidez de vous déconnecter et vous reconnecter,
          vous avez juste à saisir votre nom et prénom, identique à celui lors de l'inscription.
          Comptes existants: First name: Jugurtha, Last name: Asma  ou First name: Hylia, Last name: Boudahba
           </p>

        <div className="box">
          <div className="box-content" id="minibox">
                  <div className="title">Consultation du planning <img className="waving-hand" src={see} alt="see" /> </div>
                  <div> L'utilisateur peut regarder la liste des plannings. Il peut consulter les manche correspondantes au planning concerné et décidé de s'y inscrire 
                    ou non via le bouton "join".
                  </div>
          </div>
        </div>
        <div className="box">
          <div className="box-content" id="minibox">
                  <div className="title">Consultation des manches <img className="waving-hand" src={see} alt="see" /> </div>
                  <div> On peut consulter l'ensemble des manches existantes et décider de rejoindre une manche par exemple.
                  <p className="error">Si vous essayez de rejoindre deux fois la même manche, un message d'erreur va s'afficher vous informant que vous êtes déjà inscrit.</p>
                  </div>
          </div>
        </div>
        <div className="box">
          <div className="box-content" id="minibox">
                  <div className="title">Consultation des inscriptions <img className="waving-hand" src={see} alt="see" /> </div>
                  <div> Toujours en mode lecture, on peut voir l'ensemble des personnes inscrites et pour quel planning.
                    Si on souhaite consulter les plannings et manches où je me suis inscrit, on peut filtrer via l'input de recherche pour faciliter la lecture.
                    On peut filtrer par événement également, par exemple "Alternance" et on verra qui s'est inscrit en alternance et pour quelle entreprise. 
                  </div>
          </div>
        </div>




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
                <div> Vous trouverez ici les détails des plannings, composés du nom de l'événement et la date. 
                  Vous pourrez également consulter la liste des manches correspondantes à ce planning et décider de rejoindre une manche ou non. Vous aurez la possibilité de 
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
                   Il peut également créer une nouvelle manche pour un planning, en sélectionnant le planning voulu et ajouter le détail de la manche dans l'input.
                  </div>
          </div>
        </div>


        <div className="box">
          <div className="box-content" id="minibox">
                  <div className="title">Inscriptions <img className="waving-hand" src={add} alt="add" /> </div>
                  <div> On peut consulter la liste des inscriptions pour chaque événements. On aura l'intitulé du planning ainsi que la manche choisie et le nom de la
                    personne qui s'est inscrite.
                    On peut décider d'annuler une inscription en la supprimant avec le bouton delete. On a toujours un filtre qui permet de faire une recherche rapide.
                    L'administrateur peut ajouter une nouvelle inscription en choisissant le planning, la manche et la personne voulu.

                    <p className="error">Si vous essayez de vous inscrire deux fois aux mêmes événements, un message d'erreur va s'afficher vous informant que vous êtes déjà inscrit.</p>
                  </div>
          </div>
        </div>
    
    </div>
  </div>
  

  
  </>
  )
};

export default Home;
