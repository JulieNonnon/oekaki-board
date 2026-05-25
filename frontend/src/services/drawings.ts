// appels drawings api

import { apiFetch } from "./api";
import { Drawing } from "../types/drawing";

const API_URL = "http://localhost:4000";

export const getDrawings = async () => {
  return apiFetch("/drawings");
};

export const getDrawingById = async (
  id: string
) => {

  console.log("FETCHING:", id);

  const res = await fetch(
    `http://localhost:4000/drawings/${id}`
  );

  console.log("STATUS:", res.status);

  if (!res.ok) {
    const errorText = await res.text();

    console.error(errorText);

    throw new Error(
      "Failed to fetch drawing"
    );
  }

  return res.json();
};

export const createDrawing = async (data: {
  title: string;
  imageBase64: string;
}) => {
  return apiFetch("/drawings", {
    method: "POST",
    body: JSON.stringify(data)
  });
};