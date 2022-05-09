import React from "react";
import MyNavLink from "./MyNavLink";
import { PeopleFill, PersonPlusFill, PersonXFill, CalendarEventFill, CalendarPlusFill, CalendarXFill } from "react-bootstrap-icons";

import "../styles/components/NavBar.css";

const NavBar = () => {
  return (
    <nav className="my-navbar d-flex flex-column navbar navbar-expand-lg navbar-dark">
      <MyNavLink icon={<PeopleFill />} text="Persons" to="/persons" />
      <MyNavLink icon={<PersonPlusFill />} text="Add Person" to="/add-person" />

      <MyNavLink icon={<CalendarEventFill />} text="Events" to="/Events" />
      <MyNavLink icon={<CalendarPlusFill />} text="Add Event" to="/add-event" />
    </nav>
  );
};

export default NavBar;
