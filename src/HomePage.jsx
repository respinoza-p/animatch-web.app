import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function HomePage({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    console.log("location.state:", location.state);

    if (location.state && location.state.successMessage) {
      setSuccessMessage(location.state.successMessage);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="container">
      <Header userName={user?.name || "Usuario"} setUser={setUser} />

      {successMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {successMessage}
        </div>
      )}

      <main className="text-center mt-4">
        <h2 className="display-5">Bienvenido a Animatch</h2>
        <p className="lead">Gestiona adopciones y explora nuevas mascotas.</p>

        {/* Botones de navegación */}
        <div className="d-flex flex-column align-items-center gap-3 mt-4">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate("/registro-animal")}
          >
            🐶 Registro de Animal Rescatado
          </button>

          {/* Nuevo botón para el cuestionario */}
          <button
            className="btn btn-warning btn-lg"
            onClick={() => navigate("/cuestionario-adoptantes")}
          >
            📋 Cuestionario para Adoptantes
          </button>

          <button
            className="btn btn-success btn-lg"
            onClick={() => navigate("/hacer-match")}
          >
            💕 Hacer Match con tu Mascota
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;