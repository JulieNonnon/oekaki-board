// appels drawings api

import { apiFetch } from "./api";

const API_URL = "http://localhost:4000";

export const getDrawings = async () => {
  return apiFetch("/drawings");
};

export const createDrawing = async (data : any) => {
  const res = await fetch(`${API_URL}/drawings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
};