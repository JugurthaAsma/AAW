import "./styles/App.css";

import PersonsList from "./pages/person/PersonsList";
import AddPerson from "./pages/person/AddPerson";
import EditPerson from "./pages/person/EditPerson";

import PlanningsList from "./pages/planning/PlanningsList";
import AddPlanning from "./pages/planning/AddPlanning";
import EditPlanning from "./pages/planning/EditPlanning";

import ManchesList from "./pages/manche/ManchesList";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main>
          <NavBar />

          <div className="animated-fadeIn container d-flex flex-column align-items-center justify-content-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/persons" element={<PersonsList />} />
              <Route path="/add-person" element={<AddPerson />} />
              <Route path="/edit-person/:id" element={<EditPerson />} />

              <Route path="/plannings" element={<PlanningsList />} />
              <Route path="/add-planning" element={<AddPlanning />} />
              <Route path="/edit-planning/:id" element={<EditPlanning />} />

              <Route path="/manches/planning/:id" element={<ManchesList />} />

              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
