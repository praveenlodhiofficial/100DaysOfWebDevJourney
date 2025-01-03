import { useEffect, useState } from "react";

export function useFetch(url) {
  const [finalData, setFinalData] = useState({});
  const [loading, setLoading] = useState(true);

  async function getData() {
    setLoading(true); // Start loading

    try {
      const response = await fetch(url);
      const json = await response.json();
      setFinalData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // End loading
    }
  }

  useEffect(() => {
    getData();
  }, [url]);

  return {
    finalData,
    loading, // Include loading in the return object
  };
}
