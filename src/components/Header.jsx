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

  return (
    <nav className="navbar navbar-light bg-light border-bottom mb-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="h3 m-0">Animatch 🐾</h1>
        <div>
          <span className="me-3">Hola, {userName}!</span>
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;