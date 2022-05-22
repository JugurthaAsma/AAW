import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import RoleNeedComponent from "../../components/RoleNeedComponent";
import DeleteButton from "../../components/form/DeleteButton";
import RedirectButton from "../../components/form/RedirectButton";
import AddButton from "../../components/form/AddButton";
import { PersonPlusFill } from "react-bootstrap-icons";
import { useParams } from "react-router-dom";

const ManchesList = () => {
  let { id } = useParams();
  const { data, error, loading } = useFetch("/manche/" + (id !== "0" ? "planning/" + id : ""));
  const [manches, setManches] = useState([]);

  useEffect(() => {
    if (data) {
      setManches(data);
    }
  }, [data]);

  return (
    <>
      <h1 className="text-center mt-5">Manches List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {manches && (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Order</th>
                <RoleNeedComponent neededRole="user">
                  <th scope="col">Join</th>
                </RoleNeedComponent>
                <RoleNeedComponent neededRole="admin">
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </RoleNeedComponent>
              </tr>
            </thead>
            <tbody>
              {manches?.map((manche, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{manche.id}</td>
                  <td>{manche.name}</td>
                  <td>{manche.ordre}</td>
                  <RoleNeedComponent neededRole="user">
                    <td>
                      <AddButton
                        url="/inscription/user"
                        body={{
                          manche_id: manche.id,
                          planning_id: manche.planning_id,
                        }}
                        content={<PersonPlusFill />}
                        redirect="/plannings"
                      />
                    </td>
                  </RoleNeedComponent>
                  <RoleNeedComponent neededRole="admin">
                    <td>
                      <RedirectButton to={"/edit-manche/" + manche.id} />
                    </td>
                    <td>
                      <DeleteButton url="/manche" id={manche.id} role="admin" callback={setManches} /* redirect={"/persons"} */ />
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

export default ManchesList;
