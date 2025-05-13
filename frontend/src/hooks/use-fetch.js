import { useEffect, useState } from "react";

export const useFetch = (url, options = {}, dependencies = []) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (!url) return; // Prevent fetch if URL is invalid

    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before starting a new request
      try {
        const response = await fetch(url, options);
        let responseData;
        try {
          responseData = await response.json();
        } catch (parseError) {
          throw new Error("Failed to parse response as JSON");
        }
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}, ${response.status}`);
        }
        setData(responseData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(options), ...dependencies]); 

  return { data, loading, error };
};
