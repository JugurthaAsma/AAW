import React from "react";
import { PeopleFill, PersonPlusFill, CalendarEventFill, CalendarPlusFill } from "react-bootstrap-icons";

export const NavBarData = [
  {
    title: "Persons",
    link: "/persons",
    icon: <PeopleFill />,
  },
  {
    title: "Add Person",
    link: "/add-person",
    icon: <PersonPlusFill />,
  },
  {
    title: "Plannings",
    link: "/plannings",
    icon: <CalendarEventFill />,
  },
  {
    title: "Add Planning",
    link: "/add-planning",
    icon: <CalendarPlusFill />,
  },
  {
    title: "Manches",
    link: "/manches/planning",
  },
];
