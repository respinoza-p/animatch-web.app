import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import useAuth from "./components/useAuth";
import useFetchOptionsAdoptante from "./components/useFetchOptionsAdoptante";
import AdoptanteCuestionario from "./components/AdoptanteCuestionario";

const RegistroAdoptante = ({ user, setUser }) => {
  const navigate = useNavigate();
  const token = useAuth();

  // Definir la URL del servicio desde .env
  const API_POST = import.meta.env.VITE_REGISTRO_ADOPTANTE_POST;
  const API_GET = import.meta.env.VITE_REGISTRO_ADOPTANTE_GET;

  // Memoriza el objeto API_URLS para evitar recreaciones innecesarias
  const API_URLS = useMemo(() => ({
    componenHogar: import.meta.env.VITE_COMPONEN_HOGAR,
    fraseIdentifica: import.meta.env.VITE_FRASE_IDENTIFICA,
    porqueDeseaAdoptar: import.meta.env.VITE_PORQUE_DESEA_ADOPTAR,
    alergiaEnfermedad: import.meta.env.VITE_ALERGIA_ENFERMEDAD,
    haTenidoAnimales: import.meta.env.VITE_HA_TENIDO_ANIMALES,
    actualmenteTengo: import.meta.env.VITE_ACTUALMENTE_TENGO,
    tamanioAnimal: import.meta.env.VITE_TAM_ANIMAL,
    edadAnimal: import.meta.env.VITE_EDAD_ANIMAL,
    opinionEsteriliza: import.meta.env.VITE_OPINION_ESTERILIZA,
    dispuestoAdoptar: import.meta.env.VITE_DISPUESTO_ADOPTAR,
    vivoEn: import.meta.env.VITE_VIVO_EN,
    presupuestoMensual: import.meta.env.VITE_PRESUPUESTO_MENSUAL,
    paseosAnimal: import.meta.env.VITE_PASEOS_ANIMAL,
    tiempoSoledadAnimal: import.meta.env.VITE_TIEMPO_SOLEDAD_ANIMAL,
  }), []);

  const options = useFetchOptionsAdoptante(token, API_URLS);

  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    componenHogar: "",
    fraseIdentifica: "",
    porqueDeseaAdoptar: "",
    alergiaEnfermedad: "",
    haTenidoAnimales: "",
    actualmenteTengo: "",
    tamanioAnimal: "",
    edadAnimal: "",
    opinionEsteriliza: "",
    dispuestoAdoptar: "",
    vivoEn: "",
    presupuestoMensual: "",
    paseosAnimal: "",
    tiempoSoledadAnimal: "",
    correo: user?.email || "", // Inicializa con el correo si está disponible
  });

  // Cargar los datos si ya existe un registro
  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`${API_GET}/${user.email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData((prev) => ({
            ...prev,
            ...data.data,
          }));
        }
      } catch (error) {
        console.error("Error al recuperar datos del adoptante:", error);
      }
    };

    fetchData();
  }, [user, API_GET, token]);

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.componenHogar || !formData.fraseIdentifica) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
  
    try {

      console.log("Enviando datos:", formData);

      const response = await fetch(import.meta.env.VITE_REGISTRO_ADOPTANTE_POST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json(); // Captura el JSON del error
  
      if (!response.ok) {
        console.error("Error en respuesta del servidor:", data);
        throw new Error(data.message || "Error al registrar el adoptante");
      }
  
      alert("Registro exitoso!");
      navigate("/home");
    } catch (error) {
      console.error("Error en el envío del formulario:", error);
      alert(`Hubo un error en el registro: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <Header userName={user?.name || "Usuario"} setUser={setUser} />
      <h2 className="display-5 mt-4 text-center">🐶 Cuestionario para Adoptantes</h2>
      <p className="lead text-center">
        Ayúdanos a responder este cuestionario para hacer el mejor match con tu futuro amigo peludo.
      </p>
      <AdoptanteCuestionario
        formData={formData}
        setFormData={setFormData}
        options={options}
        handleSubmit={handleSubmit} // 🔹 Pasamos la función handleSubmit
      />
      <Footer />
    </div>
  );
};

export default RegistroAdoptante;