import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import useAuth from "./components/useAuth";
import useFetchOptions from "./components/useFetchOptions";
import AnimalForm from "./components/AnimalForm";

const RegistroAnimal = ({ user, setUser }) => {
  const navigate = useNavigate();
  const token = useAuth();

  const API_URLS = {
    sexo: import.meta.env.VITE_SEXO_API_URL,
    chip: import.meta.env.VITE_CHIP_API_URL,
    vacuna: import.meta.env.VITE_VACUNA_API_URL,
    tamAnimal: import.meta.env.VITE_TAM_ANIMAL,
    esterilizado:import.meta.env.VITE_ESTADO_REPRODUCTIVO_ANIMAL
  };

  const options = useFetchOptions(token, API_URLS);

  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    peso: "",
    sexo: "macho",
    tieneChip: "desconocido",
    vacuna: null,
    esterilizado:null,
    foto: null,
    fotoPreview: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    alert("Registro exitoso!");
  };

  return (
    <div className="container">
      <Header userName={user?.name || "Usuario"} setUser={setUser} />
      <h2 className="display-5 mt-4 text-center">🐶 Registro de Animal Rescatado</h2>
      <p className="lead text-center">Ingresa los datos para ayudar a encontrar un hogar.</p>
      <AnimalForm formData={formData} setFormData={setFormData} options={options} handleSubmit={handleSubmit} />
      <Footer />
    </div>
  );
};

export default RegistroAnimal;