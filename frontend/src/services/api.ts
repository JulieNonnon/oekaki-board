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
    const errorText = await res.text(); // 👈 important
    console.error("API ERROR:", errorText);
    throw new Error(errorText);
  }

  return res.json();
};

