import { useEffect, useState } from "react";

export const useAxiosPost = (url: string) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [url]);

  return [data];
};
