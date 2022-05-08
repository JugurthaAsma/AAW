import React, { useState } from "react";
import AddButton from "../../components/AddButton";
import Input from "../../components/Input";

const AddEvent = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(Date.now());

  return (
    <>
      <h1 className="text-center mt-5">Add an event</h1>
      <div className="d-flex mt-5 row">
        <div className="col-md-5">
          <Input value={name} placeholder="Enter the event's name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="col-md-5">
          <Input value={date} type={"date"} placeholder="Enter the event's date" onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="col-md-1">
          <AddButton url={"/event"} body={{ name, date }} />
        </div>
      </div>
    </>
  );
};

export default AddEvent;
