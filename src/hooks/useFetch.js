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
  //console.log("useFetch: ", config.SERVER_ADDRESS + url);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(config.SERVER_ADDRESS + url, { method, body, headers, credentials: "include" });
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
