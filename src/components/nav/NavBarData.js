import React from "react";
import { PeopleFill, PersonPlusFill, CalendarEventFill, CalendarPlusFill, ListStars, PersonLinesFill } from "react-bootstrap-icons";

export const NavBarData = [
  {
    title: "Persons",
    link: "/persons",
    neededRole: "admin",
    icon: <PeopleFill />,
  },
  {
    title: "Add Person",
    link: "/add-person",
    neededRole: "admin",
    icon: <PersonPlusFill />,
  },
  {
    title: "Plannings",
    link: "/plannings",
    neededRole: "",
    icon: <CalendarEventFill />,
  },
  {
    title: "Add Planning",
    link: "/add-planning",
    neededRole: "admin",
    icon: <CalendarPlusFill />,
  },
  {
    title: "Manches",
    link: "/manches/planning/0",
    neededRole: "",
    icon: <ListStars />,
  },
  {
    title: "Inscriptions",
    link: "/inscriptions/manche/0",
    neededRole: "user",
    icon: <PersonLinesFill />,
  },
];
