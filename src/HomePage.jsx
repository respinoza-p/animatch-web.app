import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function HomePage({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Depurar para ver qué viene en location.state
    console.log("location.state:", location.state);

    if (location.state && location.state.successMessage) {
      setSuccessMessage(location.state.successMessage);
      // Limpia el state para que no se muestre en futuros renderizados
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="container">
      {/* Cabecera con nombre del usuario y botón de cierre de sesión */}
      <Header userName={user?.name || "Usuario"} setUser={setUser} />

      {/* Mostrar mensaje de éxito, si existe */}
      {successMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {successMessage}
        </div>
      )}

      {/* Contenido principal */}
      <main className="text-center mt-4">
        <h2 className="display-5">Bienvenido a Animatch</h2>
        <p className="lead">Gestiona adopciones y explora nuevas mascotas.</p>

        {/* Botones de navegación */}
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate("/registro-animal")}
          >
            🐶 Registro de Animal Rescatado
          </button>

          <button
            className="btn btn-success btn-lg"
            onClick={() => navigate("/hacer-match")}
          >
            💕 Hacer Match con tu Mascota
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;