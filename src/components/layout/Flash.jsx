import React, { useEffect, useState } from "react";
import { XCircleFill, CheckCircle, DashCircle, ExclamationTriangle, InfoCircle } from "react-bootstrap-icons";
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
        setShow(false);
      }, 5000);
    });
  }, []);

  return (
    show && (
      <div className={"flash"}>
        <div className={"d-flex justify-content-between align-items-center alert alert-" + type}>
          <div className="fs-3 mx-2">
            {(type === "success" && <CheckCircle />) || (type === "danger" && <DashCircle />) || (type === "warning" && <ExclamationTriangle />) || (type === "info" && <InfoCircle />)}
          </div>
          <div className="fs-5 mx-2">
            <strong style={{ textTransform: "capitalize" }}>{type} : </strong>
            {message}
          </div>
          <div className="fs-5 mx-2" style={{ cursor: "pointer" }}>
            <XCircleFill onClick={() => setShow(false)} />
          </div>
        </div>
      </div>
    )
  );
};

export default Flash;
