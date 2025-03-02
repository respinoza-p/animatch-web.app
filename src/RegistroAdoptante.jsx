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

  // Memoriza el objeto API_URLS para evitar recreaciones innecesarias
  const API_URLS = useMemo(() => ({
    componenHogar: import.meta.env.VITE_COMPONEN_HOGAR,
    fraseIdentifica: import.meta.env.VITE_FRASE_IDENTIFICA,
    porqueDeseaAdoptar: import.meta.env.VITE_PORQUE_DESEA_ADOPTAR,
    alergiaEnfermedad: import.meta.env.VITE_ALERGIA_ENFERMEDAD,
    haTenidoAnimales: import.meta.env.VITE_HA_TENIDO_ANIMALES,
    actualmenteTengo: import.meta.env.VITE_ACTUALMENTE_TENGO,
    tamAnimal: import.meta.env.VITE_TAM_ANIMAL,
    edadAnimal: import.meta.env.VITE_EDAD_ANIMAL,
    opinionEsteriliza: import.meta.env.VITE_OPINION_ESTERILIZA,
    dispuestoAdoptar: import.meta.env.VITE_DISPUESTO_ADOPTAR,
    vivoEn: import.meta.env.VITE_VIVO_EN,
    presupuestoMensual: import.meta.env.VITE_PRESUPUESTO_MENSUAL,
    paseosAnimal: import.meta.env.VITE_PASEOS_ANIMAL,
    tiempoSoledadAnimal: import.meta.env.VITE_TIEMPO_SOLEDAD_ANIMAL
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
    tamAnimal: "",
    edadAnimal: "",
    opinionEsteriliza: "",
    dispuestoAdoptar: "",
    vivoEn: "",
    presupuestoMensual: "",
    paseosAnimal: "",
    tiempoSoledadAnimal: "",
    correo: user?.email || "", // Inicializa con el correo si está disponible
  });

  // Cuando el usuario cambia, actualiza automáticamente el correo en formData
  useEffect(() => {
    if (user?.email) {
      setFormData(prevFormData => ({ ...prevFormData, correo: user.email }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.componenHogar || !formData.fraseIdentifica) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      console.log("Datos enviados:", formData);
      alert("Registro exitoso!");
      navigate("/home"); // Redirige a home después del registro exitoso
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Hubo un error en el registro. Inténtalo nuevamente.");
    }
  };

  // Redirigir si el usuario no está autenticado
  if (!user) {
    return (
      <div className="container text-center mt-5">
        <h2>Acceso restringido</h2>
        <p>Debes iniciar sesión para completar el cuestionario.</p>
      </div>
    );
  }

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
        handleSubmit={handleSubmit}
      />
      <Footer />
    </div>
  );
};

export default RegistroAdoptante;