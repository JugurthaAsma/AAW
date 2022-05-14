import React from "react";
import MyNavLink from "../nav/MyNavLink";
import { HouseFill, PersonCircle, PersonPlus, Envelope } from "react-bootstrap-icons";

import "../../styles/components/Header.css";

const Header = () => {
  return (
    <header>
      <ul>
        <li>
          <MyNavLink to="/" title="home" className="nav-item" icon={<HouseFill />} />
        </li>
        <li>
          <MyNavLink to="/login" title="Login" className="nav-item" icon={<PersonCircle />} />
        </li>
        <li>
          <MyNavLink to="/sign-up" title="Sign Up" className="nav-item" icon={<PersonPlus />} />
        </li>
        <li>
          <MyNavLink to="/contact" title="Contact" className="nav-item" icon={<Envelope />} />
        </li>
      </ul>
    </header>
  );
};

export default Header;
