import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function HomePage({ user }) {
  return (
    <div className="container">
      {/* Cabecera */}
      <Header userName={user?.name || "Usuario"} />

      {/* Contenido principal */}
      <main className="text-center mt-4">
        <h2 className="display-5">Bienvenido a la página principal de Animatch</h2>
        <p className="lead">Gestiona adopciones y explora nuevas mascotas.</p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;