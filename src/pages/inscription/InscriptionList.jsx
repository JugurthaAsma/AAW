import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import RoleNeedComponent from "../../components/RoleNeedComponent";
import DeleteButton from "../../components/form/DeleteButton";
import FilterSearch from "../../components/form/FilterSearch";
import { toLocaleDate } from "../../helpers/DateFormatter";
import { useParams } from "react-router-dom";

const InscriptionList = () => {
  const { id } = useParams();
  const { data, error, loading } = useFetch("/inscription/" + (id !== "0" ? "manche/" + id : ""));
  const [inscriptions, setInscriptions] = useState([]);

  useEffect(() => {
    if (data) {
      setInscriptions(data);
    }
  }, [data]);

  return (
    <>
      <h1 className="text-center mt-5">Inscriptions List</h1>
      <FilterSearch data={data} setData={setInscriptions} keys={["planning_date", "planning_id", "planning_name", "manche_id", "manche_name", "person_id", "person_first_name", "person_last_name"]} />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {inscriptions && (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <RoleNeedComponent neededRole="admin">
                  <th scope="col">Planning Id</th>
                  <th scope="col">Manche Id</th>
                  <th scope="col">Person Id</th>
                </RoleNeedComponent>
                <th scope="col">Planning name</th>
                <th scope="col">Manche name</th>
                <th scope="col">Person first name</th>
                <th scope="col">Person last name</th>

                <RoleNeedComponent neededRole="admin">
                  <th scope="col">Delete</th>
                </RoleNeedComponent>
              </tr>
            </thead>
            <tbody>
              {inscriptions?.map((inscription, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{toLocaleDate(inscription.planning_date)}</td>
                  <RoleNeedComponent neededRole="admin">
                    <td>{inscription.planning_id}</td>
                    <td>{inscription.manche_id}</td>
                    <td>{inscription.person_id}</td>
                  </RoleNeedComponent>
                  <td>{inscription.planning_name}</td>
                  <td>{inscription.manche_name}</td>
                  <td>{inscription.person_first_name}</td>
                  <td>{inscription.person_last_name}</td>
                  <RoleNeedComponent neededRole="admin">
                    <td>
                      <DeleteButton
                        url="/inscription"
                        id={inscription.planning_id + "/" + inscription.person_id + "/" + inscription.manche_id}
                        role="admin"
                        callback={() => setInscriptions((elems) => elems.filter((elem) => elem.planning_id + "/" + elem.person_id + "/" + elem.manche_id !== id))}
                      />
                    </td>
                  </RoleNeedComponent>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default InscriptionList;
