import { useState, useEffect } from "react";

const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL;
const AUTH_USERNAME = import.meta.env.VITE_AUTH_USERNAME;
const AUTH_PASSWORD = import.meta.env.VITE_AUTH_PASSWORD;

const useAuth = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const response = await fetch(AUTH_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: AUTH_USERNAME, password: AUTH_PASSWORD }),
        });

        if (!response.ok) throw new Error("Error obteniendo token");

        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.error("Error autenticación:", error.message);
      }
    };

    fetchAuthToken();
  }, []);

  return token;
};

export default useAuth;