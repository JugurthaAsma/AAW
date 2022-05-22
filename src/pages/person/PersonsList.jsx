import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import DeleteButton from "../../components/form/DeleteButton";
import RedirectButton from "../../components/form/RedirectButton";
import { Trash, Pen } from "react-bootstrap-icons";

const PersonsList = () => {
  const { data, error, loading } = useFetch("/person");
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    if (data) {
      setPersons(data);
    }
  }, [data]);

  return (
    <>
      <h1 className="text-center mt-5">Persons List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {persons && (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Id</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {persons?.map((person, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{person.id}</td>
                  <td>{person.first_name}</td>
                  <td>{person.last_name}</td>
                  <td>
                    <RedirectButton to={"/edit-person/" + person.id} content={<Pen />} />
                  </td>
                  <td>
                    <DeleteButton url={"/person"} id={person.id} role="admin" callback={setPersons} content={<Trash />} /* redirect={"/persons"} */ />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default PersonsList;
