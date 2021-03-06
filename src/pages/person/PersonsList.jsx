import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import DeleteButton from "../../components/form/DeleteButton";
import RedirectButton from "../../components/form/RedirectButton";
import FilterSearch from "../../components/form/FilterSearch";
import { Trash, Pen, BoxArrowRight } from "react-bootstrap-icons";

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
      <FilterSearch data={data} setData={setPersons} keys={["id", "first_name", "last_name"]} />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {persons && (
        <>
          <h4>
            Disconnect everyone <DeleteButton url="/authentication/logoutAll" role="admin" content={<BoxArrowRight />} className="btn btn-dark" />
          </h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Id</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Edit</th>
                <th scope="col">Disconnect</th>
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
                    <DeleteButton url="/authentication/logout" id={person.id} role="admin" content={<BoxArrowRight />} className="btn btn-dark" />
                  </td>
                  <td>
                    <DeleteButton
                      url={"/person"}
                      id={person.id}
                      role="admin"
                      callback={() => setPersons((elems) => elems.filter((elem) => elem.id !== person.id))}
                      content={<Trash />} /* redirect={"/persons"} */
                    />
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
