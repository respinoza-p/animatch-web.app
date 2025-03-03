import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import useAuth from "./components/useAuth";

const HacerMatch = () => {
  const token = useAuth();
  const [loading, setLoading] = useState(false);
  const [animales, setAnimales] = useState([]);
  const [error, setError] = useState(null);
  const [sinResultados, setSinResultados] = useState(false);

  const handleBuscarMatch = async () => {
    setLoading(true);
    setError(null);
    setAnimales([]);
    setSinResultados(false);

    try {
      const correoUsuario = "espinozaplaza.rodrigo@gmail.com"; // Reemplazar con el correo de sesión dinámico
      console.log("📢 Buscando match para:", correoUsuario);

      const response = await fetch(
        `https://animatch-api-app.vercel.app/api/animatch/${correoUsuario}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los datos del Match");
      }

      const data = await response.json();
      console.log("✅ Datos obtenidos:", data);

      if (data.animales && data.animales.length > 0) {
        setAnimales(data.animales);
      } else {
        setSinResultados(true);
      }
    } catch (error) {
      console.error("❌ Error en la búsqueda:", error);
      setError("Hubo un problema al obtener los datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-center">
      <Header />
      <h2 className="display-5 mt-4">💕 Hacer Match con tu Mascota</h2>
      <p className="lead">Descubre qué mascota rescatada es la mejor para ti.</p>

      {/* 🔹 Mensaje de Disclaimer con enlace al Cuestionario */}
      <div className="alert alert-warning mt-4">
        <strong>📢 Para asegurar la mejor búsqueda:</strong> recuerda completar el{" "}
        <Link to="/cuestionario-adoptantes" className="alert-link">
          Cuestionario del Adoptante
        </Link>
        .
      </div>

      {/* 🔘 Botón con diseño destacado */}
      <button
        className="btn btn-lg btn-success mt-4 px-5 py-3 fw-bold shadow-lg animate-button"
        onClick={handleBuscarMatch}
        disabled={loading}
        style={{
          fontSize: "1.5rem",
          borderRadius: "30px",
          transition: "0.3s",
        }}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2"></span>
            Buscando...
          </>
        ) : (
          <>
            🔍🐾 Buscar Match
          </>
        )}
      </button>

      {/* 🌀 Loader mientras carga */}
      {loading && (
        <div className="mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      {/* ❌ Mostrar error si ocurre */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {/* ❌ Mensaje si no hay coincidencias */}
      {sinResultados && (
        <div className="alert alert-info mt-4">
          <strong>😞 En estos momentos no contamos con un amiguito que cumpla con tus necesidades.</strong><br />
          ¡Pero no te desanimes! Por favor, intenta más adelante. 🐶💙
        </div>
      )}

      {/* 📜 Tabla de resultados (solo si hay datos) */}
      {animales.length > 0 && !sinResultados && (
        <div className="table-responsive mt-4">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Tamaño</th>
              </tr>
            </thead>
            <tbody>
              {animales.map((animal) => (
                <tr key={animal._id}>
                  <td>
                    <img
                      src={animal.foto || "/img/default-dog.jpg"} // Foto del animal
                      alt={animal.nombre}
                      className="img-thumbnail"
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{animal.nombre}</td>
                  <td>{animal.edad} años</td>
                  <td>{animal.tamanioAnimal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default HacerMatch;