import React from "react";
import MyNavLink from "../nav/MyNavLink";
import { HouseFill, PersonCircle, PersonPlus, BoxArrowRight, Envelope } from "react-bootstrap-icons";
import RoleNeedComponent from "../RoleNeedComponent";

import "../../styles/components/Header.css";

const Header = () => {
  return (
    <header>
      <ul>
        <li>
          <MyNavLink to="/" title="home" className="nav-item" icon={<HouseFill />} />
        </li>
        <RoleNeedComponent>
          <li>
            <MyNavLink to="/login" title="Login" className="nav-item" icon={<PersonCircle />} />
          </li>
        </RoleNeedComponent>
        <RoleNeedComponent>
          <li>
            <MyNavLink to="/sign-up" title="Sign Up" className="nav-item" icon={<PersonPlus />} />
          </li>
        </RoleNeedComponent>
        <RoleNeedComponent neededRole="user">
          <li>
            <MyNavLink to="/logout" title="Logout" className="nav-item" icon={<BoxArrowRight />} />
          </li>
        </RoleNeedComponent>
        <li>
          <MyNavLink to="/contact" title="Contact" className="nav-item" icon={<Envelope />} />
        </li>
      </ul>
    </header>
  );
};

export default Header;
