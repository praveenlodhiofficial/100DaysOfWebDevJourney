import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function refresh() {
    setLoading(true);
    setError(null); // Reset error state before making a new request
    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContents(response.data.fetchContent || []); // Safely handle empty content
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load content");
        setLoading(false);
        console.error("Error fetching content:", err);
      });
  }

  useEffect(() => {
    refresh(); 
  }, []); // Empty dependency array to run only once on mount

  useEffect(()=>{
    console.log(contents);
  }, [contents])

  return { contents, refresh, loading, error };
}
