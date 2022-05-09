import config from "../config";

const DeleteButton = ({ url, id, callback, text = "X" }) => {
  const handleDelete = () => {
    fetch(config.SERVER_ADDRESS + url + "/" + id, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        console.log("delete ", data);
        callback((elems) => elems.filter((elem) => elem.id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      {text}
    </button>
  );
};

export default DeleteButton;
