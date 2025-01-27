import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";

function App() {
  // Manejo del inicio de sesión exitoso
  const handleSuccess = (credentialResponse) => {
    console.log("Credenciales de inicio de sesión:", credentialResponse);
  };

  // Manejo de errores en el inicio de sesión
  const handleFailure = () => {
    console.error("Error al iniciar sesión.");
  };

  return (
    <GoogleOAuthProvider clientId="587724636091-8q7phk2sfai7qfhpjjrg1tqsgrrogs90.apps.googleusercontent.com">
      <div style={{ textAlign: "center", marginTop: "50px", padding: "20px" }}>
        <h1>¡Bienvenido a Animatch! 🐾</h1>
        <p>Conecta mascotas rescatadas con familias amorosas.</p>
        <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />

        {/* Footer */}
        <footer style={{ marginTop: "50px", borderTop: "1px solid #ccc", paddingTop: "20px" }}>
          <p>
            <Link to="/privacy-policy" style={{ marginRight: "15px" }}>
              Política de Privacidad
            </Link>
            <Link to="/terms-of-service">Condiciones del Servicio</Link>
          </p>
        </footer>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;