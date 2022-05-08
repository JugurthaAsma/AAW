import config from "../config";

const DeleteButton = ({ url, id, callback }) => {
  const handleDelete = () => {
    fetch(config.server + url + "/" + id, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        console.log("delete ", data);
        callback((elems) => elems.filter((elem) => elem.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      X
    </button>
  );
};

export default DeleteButton;
