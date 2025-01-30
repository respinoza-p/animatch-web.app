import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const RegistroAnimal = () => {
  return (
    <div className="container text-center">
      <Header />
      <h2 className="display-5 mt-4">🐶 Registro de Animal Rescatado</h2>
      <p className="lead">Registra los datos del animal para encontrarle un hogar.</p>
      <Footer />
    </div>
  );
};

export default RegistroAnimal;