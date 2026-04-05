// appels drawings api

import { apiFetch } from "./api";
import { Drawing } from "../types/drawing";

const API_URL = "http://localhost:4000";

export const getDrawings = async (): Promise<{ data: Drawing[] }> => {
  return apiFetch("/drawings");
};

export const getDrawingById = async (id: string) => {
  return apiFetch(`/drawings/${id}`);
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