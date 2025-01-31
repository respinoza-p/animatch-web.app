import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
    caracter: "fácil",
    entrenamiento: "fácil",
    cuidados: "fácil",
    fechaRescate: "",
    observaciones: "",
    regionRescate: "",
    comunaRescate: "",
    foto: null,
    fotoPreview: null,
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

    if (type === "file") {
      const file = files[0];
      if (file && !["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        alert("Formato de imagen no válido. Solo se permiten JPG, JPEG y PNG.");
        return;
      }
      setFormData({
        ...formData,
        foto: file,
        fotoPreview: URL.createObjectURL(file),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      if (regex[name] && !regex[name].test(value)) {
        setErrors({ ...errors, [name]: `Formato incorrecto para ${name}` });
      } else {
        const newErrors = { ...errors };
        delete newErrors[name];
        setErrors(newErrors);
      }
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

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Especie</label>
            <select className="form-select" name="especie" value={formData.especie} onChange={handleChange}>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
            </select>
          </div>
        </div>

        {/* 🔹 Carga de Foto */}
        <div className="mt-3">
          <label className="form-label">Foto del Animal</label>
          <input type="file" className="form-control" name="foto" onChange={handleChange} accept="image/*" required />
          {formData.fotoPreview && (
            <div className="text-center mt-3">
              <img src={formData.fotoPreview} alt="Vista previa" className="img-thumbnail" style={{ maxWidth: "200px" }} />
            </div>
          )}
        </div>

        <div className="row mt-3">
          <div className="col-md-4">
            <label className="form-label">Carácter</label>
            <select className="form-select" name="caracter" value={formData.caracter} onChange={handleChange}>
              <option value="fácil">Fácil</option>
              <option value="intermedio">Intermedio</option>
              <option value="alto">Alto</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Entrenamiento</label>
            <select className="form-select" name="entrenamiento" value={formData.entrenamiento} onChange={handleChange}>
              <option value="fácil">Fácil</option>
              <option value="intermedio">Intermedio</option>
              <option value="alto">Alto</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Cuidados</label>
            <select className="form-select" name="cuidados" value={formData.cuidados} onChange={handleChange}>
              <option value="fácil">Fácil</option>
              <option value="intermedio">Intermedio</option>
              <option value="alto">Alto</option>
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label className="form-label">Observaciones</label>
          <textarea
            className="form-control"
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            rows="3"
          ></textarea>
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