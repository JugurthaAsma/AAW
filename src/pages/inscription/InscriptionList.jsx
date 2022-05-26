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
      <FilterSearch
        data={data}
        setData={(event) =>
          setInscriptions(
            data.filter((val) =>
              (toLocaleDate(val.planning_date) + val.planning_id + val.planning_name + val.manche_id + val.manche_name + val.person_id + val.person_first_name + val.person_last_name)
                .toLowerCase()
                .includes(event.target.value.toLowerCase())
            )
          )
        }
      />

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
                </RoleNeedComponent>
                <th scope="col">Planning name</th>
                <RoleNeedComponent neededRole="admin">
                  <th scope="col">Manche Id</th>
                </RoleNeedComponent>
                <th scope="col">Manche name</th>
                <RoleNeedComponent neededRole="admin">
                  <th scope="col">Person Id</th>
                </RoleNeedComponent>
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
                  </RoleNeedComponent>
                  <td>{inscription.planning_name}</td>
                  <RoleNeedComponent neededRole="admin">
                    <td>{inscription.manche_id}</td>
                  </RoleNeedComponent>
                  <td>{inscription.manche_name}</td>
                  <RoleNeedComponent neededRole="admin">
                    <td>{inscription.person_id}</td>
                  </RoleNeedComponent>
                  <td>{inscription.person_first_name}</td>
                  <td>{inscription.person_last_name}</td>
                  <RoleNeedComponent neededRole="admin">
                    <td>
                      <DeleteButton url="/inscription" id={inscription.id} role="admin" callback={() => setInscriptions((elems) => elems.filter((elem) => elem.id !== id))} />
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
