import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function HomePage({ user }) {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* Cabecera */}
      <Header userName={user?.name || "Usuario"} />

      {/* Contenido principal */}
      <main style={{ marginTop: "30px" }}>
        <h2>Bienvenido a la página principal de Animatch</h2>
        <p>Esta es tu página personalizada para gestionar adopciones y explorar nuevas mascotas.</p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;