// appels drawings api

const API_URL = "http://localhost:4000";

export const getDrawings = async (page = 1) => {
  const res = await fetch(`${API_URL}/drawings?page=${page}`);
  return res.json();
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