import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL;
const AUTH_USERNAME = import.meta.env.VITE_AUTH_USERNAME;
const AUTH_PASSWORD = import.meta.env.VITE_AUTH_PASSWORD;
const SEXO_API_URL = import.meta.env.VITE_SEXO_API_URL;
const CHIP_API_URL = import.meta.env.VITE_CHIP_API_URL;
const VACUNA_API_URL = import.meta.env.VITE_VACUNA_API_URL;

const RegistroAnimal = ({ user, setUser }) => {
  const navigate = useNavigate();

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    nombre: "",
    especie: "perro",
    edad: "",
    tamaño: "",
    peso: "",
    sexo: "macho",
    alimentacionEspecial: "desconocido",
    tieneChip: "desconocido",
    adopcionesPrevias: "0",
    nivelActividad: "actividad normal",
    caracter: "fácil",
    entrenamiento: "fácil",
    cuidados: "fácil",
    fechaRescate: getCurrentDate(),
    observaciones: "",
    regionRescate: "",
    comunaRescate: "",
    foto: null,
    fotoPreview: null,
    vacuna: null
  });

  const [sexoOpciones, setSexoOpciones] = useState([]);
  const [chipOpciones, setChipOpciones] = useState([]);
  const [vacunaOpciones, setVacunaOpciones] = useState([]);
  const [token, setToken] = useState("");

  // 🔹 Obtener el token de autenticación
  const fetchAuthToken = async () => {
    try {
      const response = await fetch(AUTH_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: AUTH_USERNAME, password: AUTH_PASSWORD }),
      });
  
      // 📌 Verifica el contenido de la respuesta antes de convertir a JSON
      const textResponse = await response.text();
  
      // ⚠ Evita convertir JSON si la respuesta está vacía
      if (!textResponse) {
        throw new Error("❌ Respuesta vacía del servidor.");
      }
  
      const data = JSON.parse(textResponse); // Convertir manualmente a JSON
  
      if (response.ok) {
        setToken(data.token);
      } else {
        console.error("❌ Error al obtener el token:", data);
      }
    } catch (error) {
      console.error("❌ Error de autenticación:", error.message);
    }
  };

  // 🔹 Obtener la lista de sexos desde la API
  const fetchSexoOpciones = async () => {
    try {
      if (!token) return;

      const response = await fetch(SEXO_API_URL, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setSexoOpciones(data);
      } else {
        console.error("❌ Error al obtener sexos:", data);
      }
    } catch (error) {
      console.error("❌ Error al obtener sexos:", error);
    }
  };  

  // 🔹 Obtener la lista de opciones para el chip desde la API
  const fetchChipOpciones = async () => {
    try {
      if (!token) return;

      const response = await fetch(CHIP_API_URL, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setChipOpciones(data);
      } else {
        console.error("❌ Error al obtener valores para chip:", data);
      }
    } catch (error) {
      console.error("❌ Error al obtener valores para chip:", error);
    }
  };  

  // 🔹 Obtener la lista de opciones para las vacunas desde la API
  const fetchVacunaOpciones = async () => {
    try {
      if (!token) return;

      const response = await fetch(VACUNA_API_URL, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setVacunaOpciones(data);
      } else {
        console.error("❌ Error al obtener valores para vacunas:", data);
      }
    } catch (error) {
      console.error("❌ Error al obtener valores para vacunas:", error);
    }
  }; 

  useEffect(() => {
    fetchAuthToken();
  }, []);  

  useEffect(() => {
    if (token) {
      fetchSexoOpciones();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchChipOpciones();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchVacunaOpciones();
    }
  }, [token]);  

  const [errors, setErrors] = useState({});

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
      setFormData({ ...formData, [name]: value });

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

        <div className="row mt-3">

          <div className="col-md-4">
            <label className="form-label">Peso (kg)</label>
            <input
              type="text"
              className="form-control"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Tamaño (Centímentros) </label>
            <input
              type="text"
              className="form-control"
              name="tamaño"
              value={formData.tamaño}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Sexo</label>
            <select className="form-select" name="sexo" value={formData.sexo} onChange={(e) => setFormData({ ...formData, sexo: e.target.value })} required>
              <option value="">Seleccione...</option>
              {sexoOpciones.map((opcion) => (
                <option key={opcion._id} value={opcion.valor}>
                  {opcion.valor}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mt-3">
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
            <div className="col-md-4">
                <label className="form-label">¿Tiene chip?</label>
                <select className="form-select" name="tieneChip" value={formData.tieneChip} onChange={(e) => setFormData({ ...formData, tieneChip: e.target.value })} required>
                  <option value="">Seleccione...</option>
                  {chipOpciones.map((opcion) => (
                    <option key={opcion._id} value={opcion.valor}>
                      {opcion.valor}
                    </option>
                  ))}
                </select>                
            </div>

            <div className="col-md-4">
                <label className="form-label">Estado vacunas</label>
                <select className="form-select" name="vacuna" value={formData.vacuna} onChange={(e) => setFormData({ ...formData, vacuna: e.target.value })} required>
                  <option value="">Seleccione...</option>
                  {vacunaOpciones.map((opcion) => (
                    <option key={opcion._id} value={opcion.valor}>
                      {opcion.valor}
                    </option>
                  ))}
                </select>           
            </div>

            <div className="col-md-4">
                <label className="form-label">Tipo de actividad requerida</label>
                <select className="form-select" name="nivelActividad" value={formData.nivelActividad} onChange={handleChange}>
                    <option value="sinDatos">No lo sé</option>
                    <option value="normal">Normal</option>
                    <option value="baja">Baja</option>
                    <option value="alta">Alta</option>
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

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary btn-lg">📝 Registrar Animal</button>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default RegistroAnimal;