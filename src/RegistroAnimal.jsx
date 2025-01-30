import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const regionesComunas = {
  "Región Metropolitana": ["Santiago", "Providencia", "Las Condes", "Maipú", "Puente Alto"],
  "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Concón"],
  "Región del Biobío": ["Concepción", "Talcahuano", "Los Ángeles"],
};

const RegistroAnimal = ({ user, setUser }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    especie: "perro",
    edad: "",
    tamaño: "",
    peso: "",
    sexo: "macho",
    expectativaVida: "0",
    alimentacionEspecial: "desconocido",
    tratamientoEspecial: "desconocido",
    tieneChip: "desconocido",
    adopcionesPrevias: "0",
    personalidad: "normal",
    nivelActividad: "actividad normal",
    nivelAprendizaje: "normal",
    relacionesOtrosAnimales: "normal",
    fechaRescate: "",
    observaciones: "",
    regionRescate: "",
    comunaRescate: "",
    foto: null,
  });

  const [errors, setErrors] = useState({});
  const [comunas, setComunas] = useState([]);

  const regex = {
    nombre: /^[a-zA-Z\s]+$/,
    edad: /^[0-9]{1,2}$/,
    tamaño: /^[0-9]+$/,
    peso: /^\d+(\.\d{1,2})?$/,
    expectativaVida: /^[0-9]{1,2}$/,
    fechaRescate: /^\d{4}-\d{2}-\d{2}$/,
    observaciones: /^.{10,}$/,
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });

    if (regex[name] && !regex[name].test(value)) {
      setErrors({ ...errors, [name]: `Formato incorrecto para ${name}` });
    } else {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }

    if (name === "regionRescate") {
      setComunas(regionesComunas[value] || []);
      setFormData({ ...formData, comunaRescate: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      alert("Corrige los errores antes de enviar el formulario.");
      return;
    }

    console.log("Datos enviados:", formData);
    alert("Registro exitoso!");
  };

  return (
    <div className="container">
      <Header userName={user?.name || "Usuario"} setUser={setUser} />

      <h2 className="display-5 mt-4 text-center">🐶 Registro de Animal Rescatado</h2>
      <p className="lead text-center">Ingresa los datos del animal para ayudarlo a encontrar un hogar.</p>

      <div className="text-center mb-3">
        <button className="btn btn-secondary" onClick={() => navigate("/home")}>
          🔙 Volver al Home
        </button>
      </div>

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Especie</label>
            <select className="form-select" name="especie" value={formData.especie} onChange={handleChange}>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
            </select>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <label className="form-label">Peso (kg)</label>
            <input type="text" className="form-control" name="peso" value={formData.peso} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Sexo</label>
            <select className="form-select" name="sexo" value={formData.sexo} onChange={handleChange}>
              <option value="macho">Macho</option>
              <option value="hembra">Hembra</option>
            </select>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <label className="form-label">Fecha de Rescate</label>
            <input type="date" className="form-control" name="fechaRescate" value={formData.fechaRescate} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Cantidad de adopciones anteriores</label>
            <select className="form-select" name="adopcionesPrevias" value={formData.adopcionesPrevias} onChange={handleChange}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2+</option>
            </select>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <label className="form-label">¿Cuenta con chip?</label>
            <select className="form-select" name="tieneChip" value={formData.tieneChip} onChange={handleChange}>
              <option value="si">Sí</option>
              <option value="no">No</option>
              <option value="desconocido">Desconocido</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Personalidad</label>
            <select className="form-select" name="personalidad" value={formData.personalidad} onChange={handleChange}>
              <option value="dócil">Dócil</option>
              <option value="normal">Normal</option>
              <option value="travieso">Travieso</option>
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label className="form-label">Observaciones</label>
          <textarea className="form-control" name="observaciones" value={formData.observaciones} onChange={handleChange} rows="3"></textarea>
        </div>

        <div className="mt-3">
          <label className="form-label">Foto del Animal</label>
          <input type="file" className="form-control" name="foto" onChange={handleChange} required />
        </div>

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary btn-lg">📝 Registrar Animal</button>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default RegistroAnimal;