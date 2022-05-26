import { useEffect, useState } from "react";

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
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + url, { method, body, headers, credentials: "include" });
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
