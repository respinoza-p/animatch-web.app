import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const RegistroAnimal = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    especie: "",
    raza: "",
    color: "",
    peso: "",
    fechaRescate: "",
    ubicacion: "",
    estadoSalud: "",
    descripcion: "",
    caracter: "normal", // Valor por defecto
    foto: null,
  });

  const [errors, setErrors] = useState({});

  const regex = {
    nombre: /^[a-zA-Z\s]+$/,
    edad: /^[0-9]{1,2}$/,
    especie: /^[a-zA-Z\s]+$/,
    raza: /^[a-zA-Z\s]+$/,
    color: /^[a-zA-Z\s]+$/,
    peso: /^\d+(\.\d{1,2})?$/,
    fechaRescate: /^\d{4}-\d{2}-\d{2}$/,
    ubicacion: /^[a-zA-Z\s]+$/,
    estadoSalud: /^[a-zA-Z\s]+$/,
    descripcion: /^.{10,}$/, // Mínimo 10 caracteres
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });

    // Validar el campo con regex si aplica
    if (regex[name] && !regex[name].test(value)) {
      setErrors({
        ...errors,
        [name]: `Formato incorrecto para ${name}`,
      });
    } else {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si hay errores antes de enviar
    if (Object.keys(errors).length > 0) {
      alert("Corrige los errores antes de enviar el formulario.");
      return;
    }

    console.log("Datos enviados:", formData);
    alert("Registro exitoso!");
  };

  return (
    <div className="container">
      <Header />
      <h2 className="display-5 mt-4 text-center">🐶 Registro de Animal Rescatado</h2>
      <p className="lead text-center">Ingresa los datos del animal para ayudarlo a encontrar un hogar.</p>

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="row">
          {/* Nombre */}
          <div className="col-md-6">
            <label className="form-label">Nombre del Animal</label>
            <input
              type="text"
              className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
          </div>

          {/* Edad */}
          <div className="col-md-6">
            <label className="form-label">Edad (años)</label>
            <input
              type="number"
              className={`form-control ${errors.edad ? "is-invalid" : ""}`}
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              required
            />
            {errors.edad && <div className="invalid-feedback">{errors.edad}</div>}
          </div>
        </div>

        <div className="row mt-3">
          {/* Especie */}
          <div className="col-md-6">
            <label className="form-label">Especie</label>
            <input
              type="text"
              className={`form-control ${errors.especie ? "is-invalid" : ""}`}
              name="especie"
              value={formData.especie}
              onChange={handleChange}
              required
            />
            {errors.especie && <div className="invalid-feedback">{errors.especie}</div>}
          </div>

          {/* Raza */}
          <div className="col-md-6">
            <label className="form-label">Raza</label>
            <input
              type="text"
              className={`form-control ${errors.raza ? "is-invalid" : ""}`}
              name="raza"
              value={formData.raza}
              onChange={handleChange}
            />
            {errors.raza && <div className="invalid-feedback">{errors.raza}</div>}
          </div>
        </div>

        <div className="row mt-3">
          {/* Carácter */}
          <div className="col-md-6">
            <label className="form-label">Carácter del Animal</label>
            <select
              className="form-select"
              name="caracter"
              value={formData.caracter}
              onChange={handleChange}
            >
              <option value="normal">Normal</option>
              <option value="muy-tranquilo">Muy Tranquilo</option>
              <option value="tranquilo">Tranquilo</option>
              <option value="levemente-agresivo">Levemente Agresivo</option>
              <option value="agresivo">Agresivo</option>
            </select>
          </div>

          {/* Peso */}
          <div className="col-md-6">
            <label className="form-label">Peso (kg)</label>
            <input
              type="text"
              className={`form-control ${errors.peso ? "is-invalid" : ""}`}
              name="peso"
              value={formData.peso}
              onChange={handleChange}
            />
            {errors.peso && <div className="invalid-feedback">{errors.peso}</div>}
          </div>
        </div>

        <div className="row mt-3">
          {/* Fecha de Rescate */}
          <div className="col-md-6">
            <label className="form-label">Fecha de Rescate</label>
            <input
              type="date"
              className="form-control"
              name="fechaRescate"
              value={formData.fechaRescate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Ubicación */}
          <div className="col-md-6">
            <label className="form-label">Ubicación</label>
            <input
              type="text"
              className={`form-control ${errors.ubicacion ? "is-invalid" : ""}`}
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              required
            />
            {errors.ubicacion && <div className="invalid-feedback">{errors.ubicacion}</div>}
          </div>
        </div>

        {/* Foto del Animal */}
        <div className="mt-3">
          <label className="form-label">Foto del Animal</label>
          <input type="file" className="form-control" name="foto" onChange={handleChange} required />
        </div>

        {/* Botón de enviar */}
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary btn-lg">
            📝 Registrar Animal
          </button>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default RegistroAnimal;