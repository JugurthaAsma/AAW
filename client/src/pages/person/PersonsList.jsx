import useFetch from "../../hooks/useFetch";
import DeleteButton from "../../components/DeleteButton";
import { useEffect, useState } from "react";

const PersonsList = () => {
  const { data, error, loading } = useFetch("/persons");
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
                    <button className="btn btn-warning">Edit</button>
                  </td>
                  <td>
                    <DeleteButton url={"/person"} id={person.id} callback={setPersons} />
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
