import React from "react";
import { PeopleFill, PersonPlusFill, CalendarEventFill, CalendarPlusFill } from "react-bootstrap-icons";

export const NavBarData = [
  {
    title: "Persons",
    link: "/persons",
    neededRole: "user",
    icon: <PeopleFill />,
  },
  {
    title: "Add Person",
    link: "/add-person",
    neededRole: "user",
    icon: <PersonPlusFill />,
  },
  {
    title: "Plannings",
    link: "/plannings",
    neededRole: null,
    icon: <CalendarEventFill />,
  },
  {
    title: "Add Planning",
    link: "/add-planning",
    neededRole: "user",
    icon: <CalendarPlusFill />,
  },
  {
    title: "Manches",
    link: "/manches/planning",
    neededRole: "user",
  },
];
