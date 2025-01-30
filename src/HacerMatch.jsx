import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const HacerMatch = () => {
  return (
    <div className="container text-center">
      <Header />
      <h2 className="display-5 mt-4">💕 Hacer Match con tu Mascota</h2>
      <p className="lead">Descubre qué mascota rescatada es la mejor para ti.</p>
      <Footer />
    </div>
  );
};

export default HacerMatch;