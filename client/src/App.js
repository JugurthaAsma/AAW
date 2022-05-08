import "./styles/App.css";
import PersonsList from "./pages/person/PersonsList";
import AddPerson from "./pages/person/AddPerson";
import EditPerson from "./pages/person/EditPerson";

import EventsList from "./pages/event/EventsList";
import AddEvent from "./pages/event/AddEvent";
import EditEvent from "./pages/event/EditEvent";

import ErrorPage from "./pages/ErrorPage";

import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Router>
          <NavBar />

          <div className="container">
            <Routes>
              <Route path="/persons" element={<PersonsList />} />
              <Route path="/add-person" element={<AddPerson />} />
              <Route path="/edit-person" element={<EditPerson />} />

              <Route path="/events" element={<EventsList />} />
              <Route path="/add-event" element={<AddEvent />} />
              <Route path="/edit-event" element={<EditEvent />} />

              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </Router>
      </main>

      <Footer />
    </div>
  );
}

export default App;
