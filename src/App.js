import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthenticationContext from "./hooks/AuthenticationContext";

// Person pages
import PersonsList from "./pages/person/PersonsList";
import AddPerson from "./pages/person/AddPerson";
import EditPerson from "./pages/person/EditPerson";

// planning pages
import PlanningsList from "./pages/planning/PlanningsList";
import AddPlanning from "./pages/planning/AddPlanning";
import EditPlanning from "./pages/planning/EditPlanning";

// manche pages
import ManchesList from "./pages/manche/ManchesList";
import AddManche from "./pages/manche/AddManche";

// inscription pages
import InscriptionList from "./pages/inscription/InscriptionList";
import AddInscription from "./pages/inscription/AddInscription";

// other pages
import Home from "./pages/Home";
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/SignUp";
import Logout from "./pages/authentication/Logout";
import AboutUs from "./pages/AboutUs";
import ErrorPage from "./pages/ErrorPage";

// layout
import Header from "./components/layout/Header";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/layout/Footer";
import Flash from "./components/layout/Flash";

import "./styles/App.css";

// for the flash message
import Bus from "./helpers/Bus";
window.flash = (message, type = "success") => {
  Bus.emit("flash", { message, type });
};

function App() {
  /**
   * make first fetch with the token to get the person data
   */
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/authentication/", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log("logged person with token : ", data);
        setPerson(data);
      })
      .catch((error) => {
        window.flash(error.message, "danger");
      });
  }, []);

  /**
   * saving the current person in the context of the app
   * children components can change this value by using setPerson (ex. login component)
   */
  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
    role: "visitor",
  });

  // context value of the context provider
  let AuthenticationContextValue = {
    person,
    setPerson,
  };

  return (
    <AuthenticationContext.Provider value={AuthenticationContextValue}>
      <div className="App">
        <Flash />
        <BrowserRouter>
          <Header />
          <main>
            <NavBar />

            <div className="animated-fadeIn container d-flex flex-column align-items-center justify-content-center">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/about-us" element={<AboutUs />} />

                <Route path="/persons" element={<PersonsList />} />
                <Route path="/add-person" element={<AddPerson />} />
                <Route path="/edit-person/:id" element={<EditPerson />} />

                <Route path="/plannings" element={<PlanningsList />} />
                <Route path="/add-planning" element={<AddPlanning />} />
                <Route path="/edit-planning/:id" element={<EditPlanning />} />

                <Route path="/manches/planning/:id" element={<ManchesList />} />
                <Route path="/add-manche" element={<AddManche />} />

                <Route path="/inscriptions/manche/:id" element={<InscriptionList />} />
                <Route path="/add-inscription" element={<AddInscription />} />

                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </div>
          </main>

          <Footer />
        </BrowserRouter>
      </div>
    </AuthenticationContext.Provider>
  );
}

export default App;
