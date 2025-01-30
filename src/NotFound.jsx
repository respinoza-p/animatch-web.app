import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center">
      <Header />
      <h2 className="display-5 mt-4">❌ Error 404 - Página no encontrada</h2>
      <p className="lead">Lo sentimos, la página que buscas no existe.</p>
      <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
        🔙 Volver al Inicio
      </button>
      <Footer />
    </div>
  );
};

export default NotFound;