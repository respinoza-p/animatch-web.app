import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ userName, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <nav className="navbar navbar-light bg-light border-bottom mb-3">
      <div className="container d-flex justify-content-between align-items-center">
        
        {/* 🔹 Botón Volver al Home alineado a la izquierda */}
        <button className="btn btn-secondary btn-sm" onClick={goToHome}>
          🏠 Volver al Home
        </button>

        {/* 🔹 Título centrado */}
        <h1 className="h3 m-0 text-center flex-grow-1">Animatch 🐾</h1>

        {/* 🔹 Sección de usuario y cerrar sesión alineada a la derecha */}
        <div className="d-flex align-items-center">
          <span className="me-3">Hola, {userName || "Usuario"}!</span>
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Header;