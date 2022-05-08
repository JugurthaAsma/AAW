import useFetch from "../../hooks/useFetch";
import DeleteButton from "../../components/DeleteButton";
import EditButton from "../../components/EditButton";
import { toLocaleDate } from "../../helpers/DateFormatter";
import { useEffect, useState } from "react";

const EventsList = () => {
  const { data, error, loading } = useFetch("/events");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data]);

  return (
    <>
      <h1 className="text-center mt-5">Events List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {events && (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {events?.map((event, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{event.id}</td>
                  <td>{event.name}</td>
                  <td>{toLocaleDate(event.date)}</td>
                  <td>
                    <EditButton to={"/edit-event/" + event.id} />
                  </td>
                  <td>
                    <DeleteButton url={"/event"} id={event.id} callback={setEvents} />
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

export default EventsList;
