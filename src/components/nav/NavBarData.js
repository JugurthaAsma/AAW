import React from "react";
import { PeopleFill, PersonPlusFill, CalendarEventFill, CalendarPlusFill, ListStars, JournalPlus, Clipboard2CheckFill, Clipboard2PlusFill } from "react-bootstrap-icons";

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
    title: "Add Manche",
    link: "/add-manche",
    neededRole: "admin",
    icon: <JournalPlus />,
  },
  {
    title: "Inscriptions",
    link: "/inscriptions/manche/0",
    neededRole: "user",
    icon: <Clipboard2CheckFill />,
  },
  {
    title: "Add Inscription",
    link: "/add-inscription",
    neededRole: "admin",
    icon: <Clipboard2PlusFill />,
  },
];
