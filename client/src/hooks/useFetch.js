import { useEffect, useState } from "react";
import config from "../config";

const useFetch = (
  url,
  method = "GET",
  body = null,
  headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(config.server + url, { method, body, headers })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { data, error, loading };
};

export default useFetch;
