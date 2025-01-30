import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function HomePage({ user, setUser }) {
  return (
    <div className="container">
      {/* Cabecera con nombre del usuario y botón de cierre de sesión */}
      <Header userName={user?.name || "Usuario"} setUser={setUser} />

      {/* Contenido principal */}
      <main className="text-center mt-4">
        <h2 className="display-5">Bienvenido a Animatch</h2>
        <p className="lead">Gestiona adopciones y explora nuevas mascotas.</p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;