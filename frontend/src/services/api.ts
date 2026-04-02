// config fetch api

const API_URL = "http://localhost:4000";

export const apiFetch = async (endpoint: string, options?: RequestInit) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {})
    }
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
};