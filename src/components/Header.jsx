import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ userName }) => {
  const navigate = useNavigate();

  // Manejo del cierre de sesión
  const handleLogout = () => {
    console.log("Cerrando sesión...");
    // Aquí puedes limpiar el estado de autenticación (ej. eliminar tokens)
    navigate("/"); // Redirige al usuario a la página de inicio
  };

  return (
    <header
      style={{
        backgroundColor: "#f8f9fa",
        padding: "15px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: "0", fontSize: "1.5rem" }}>Animatch 🐾</h1>
        <div>
          <span style={{ marginRight: "15px" }}>Hola, {userName}!</span>
          <button
            onClick={handleLogout}
            style={{
              padding: "5px 10px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;