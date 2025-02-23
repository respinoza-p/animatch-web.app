import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import useAuth from "./components/useAuth";
import useFetchOptions from "./components/useFetchOptions";
import AnimalForm from "./components/AnimalForm";

const RegistroAnimal = ({ user, setUser }) => {
  const navigate = useNavigate();
  const token = useAuth();

  // Memoriza el objeto API_URLS para evitar que se cree una nueva referencia en cada render
  const API_URLS = useMemo(() => ({
    sexo: import.meta.env.VITE_SEXO_API_URL,
    vacuna: import.meta.env.VITE_VACUNA_API_URL,
    esterilizado: import.meta.env.VITE_ESTADO_REPRODUCTIVO_ANIMAL,
    raza: import.meta.env.VITE_RAZA_ANIMAL,
    tamAnimal: import.meta.env.VITE_TAM_ANIMAL,
    chip: import.meta.env.VITE_CHIP_API_URL,
    alimentacion: import.meta.env.VITE_TIPO_ALIMENTACION,
    tipoActividad: import.meta.env.VITE_ACTIVIDAD_ANIMAL,
    caracter: import.meta.env.VITE_CARACTER_ANIMAL,
    tipoEntrenamiento: import.meta.env.VITE_ENTRENAMIENTO_ANIMAL,
    cuidados: import.meta.env.VITE_CUIDADOS_ANIMAL,
    problemaComportamiento: import.meta.env.VITE_PROBLEMA_COMPORTAMIENTO,
    relacionOtrosAnimales: import.meta.env.VITE_RELACION_OTROS_ANIMALES,
    perroAptoPara: import.meta.env.VITE_TIPO_VIVIENDA_ANIMAL,
    pelechaCaspa: import.meta.env.VITE_PELECHA_CASPA_ANIMAL,        
  }), [])

  const options = useFetchOptions(token, API_URLS);

  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    peso: "",
    sexo: "macho",
    vacuna: null,
    esterilizado: null,
    raza: null,
    tamAnimal: null,
    chip: null,
    alimentacion: null,    
    fechaNacimiento: "",
    fechaRescate: "",
    cantAdopciones: 0,
    tipoActividad: null,
    caracter: null,
    tipoEntrenamiento: null,
    cuidados: null,
    problemaComportamiento: null,
    relacionOtrosAnimales: null,
    perroAptoPara: null,
    pelechaCaspa: null,                    
    fotos: [],
    fotosPreview: []
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
      <AnimalForm
        formData={formData}
        setFormData={setFormData}
        options={options}
        handleSubmit={handleSubmit}
      />
      <Footer />
    </div>
  );
};

export default RegistroAnimal;