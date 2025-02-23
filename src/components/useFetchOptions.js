import { useState, useEffect } from "react";

const useFetchOptions = (token, urls) => {
  const [options, setOptions] = useState({ sexo: [], chip: [], vacuna: [], tamAnimal: [], esterilizado: [] });

  useEffect(() => {
    if (!token) return;

    const fetchOptions = async (key, url) => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`Error al obtener ${key}`);

        const data = await response.json();
        setOptions((prev) => ({ ...prev, [key]: data }));
      } catch (error) {
        console.error(`Error al obtener ${key}:`, error);
      }
    };

    Object.entries(urls).forEach(([key, url]) => fetchOptions(key, url));
  }, [token, urls]);

  return options;
};

export default useFetchOptions;