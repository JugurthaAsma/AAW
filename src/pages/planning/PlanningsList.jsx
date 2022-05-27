import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import RoleNeedComponent from "../../components/RoleNeedComponent";
import DeleteButton from "../../components/form/DeleteButton";
import RedirectButton from "../../components//form/RedirectButton";
import FilterSearch from "../../components/form/FilterSearch";
import { Eye } from "react-bootstrap-icons";

const PlanningsList = () => {
  const { data, error, loading } = useFetch("/planning");
  const [plannings, setPlannings] = useState([]);

  useEffect(() => {
    if (data) {
      setPlannings(data);
    }
  }, [data]);

  return (
    <>
      <h1 className="text-center mt-5">Plannings List</h1>
      <FilterSearch data={data} setData={setPlannings} keys={["id", "name", "date"]} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {plannings && (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Manches</th>
                <RoleNeedComponent neededRole="admin">
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </RoleNeedComponent>
              </tr>
            </thead>
            <tbody>
              {plannings?.map((planning, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{planning.id}</td>
                  <td>{planning.name}</td>
                  <td>{planning.date}</td>
                  <td>
                    <RedirectButton to={"/manches/planning/" + planning.id} content={<Eye />} className="btn btn-info" />
                  </td>
                  <RoleNeedComponent neededRole="admin">
                    <td>
                      <RedirectButton to={"/edit-planning/" + planning.id} />
                    </td>
                    <td>
                      <DeleteButton url="/planning" id={planning.id} role="admin" callback={() => setPlannings((elems) => elems.filter((elem) => elem.id !== planning.id))} />
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

export default PlanningsList;
