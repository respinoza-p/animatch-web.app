import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const RegistroAnimal = ({ user, setUser }) => {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Header con el nombre del usuario */}
      <Header userName={user?.name || "Usuario"} setUser={setUser} />

      <h2 className="display-5 mt-4 text-center">🐶 Registro de Animal Rescatado</h2>
      <p className="lead text-center">Ingresa los datos del animal para ayudarlo a encontrar un hogar.</p>

      {/* Botón para volver al Home */}
      <div className="text-center mb-3">
        <button className="btn btn-secondary" onClick={() => navigate("/home")}>
          🔙 Volver al Home
        </button>
      </div>

      {/* Aquí iría el formulario */}

      <Footer />
    </div>
  );
};

export default RegistroAnimal;