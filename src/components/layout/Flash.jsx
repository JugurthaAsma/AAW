import React, { useEffect, useState } from "react";
import Bus from "../../helpers/Bus";

const Flash = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    Bus.addListener("flash", ({ message, type }) => {
      setShow(true);
      setMessage(message);
      setType(type);
      setTimeout(() => {
        console.log("hide");
        setShow(false);
      }, 5000);
    });
  }, []);

  return (
    show && (
      <div className={"flash alert alert-" + type + " alert-dismissible fade show"} role="alert">
        <h4>{message}</h4>
      </div>
    )
  );
};

export default Flash;
