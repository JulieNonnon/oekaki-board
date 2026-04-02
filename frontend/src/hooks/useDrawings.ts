import { useEffect, useState } from "react";
// import { getDrawings } from "@/services/drawings";

export const useDrawings = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // getDrawings().then(res => setData(res.data));
  }, []);

  return data;
};