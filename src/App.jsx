import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const navigate = useNavigate();

  // Manejo del inicio de sesión exitoso
  const handleSuccess = (credentialResponse) => {
    console.log("Credenciales de inicio de sesión:", credentialResponse);
    navigate("/home"); // Redirige a la página principal
  };

  // Manejo de errores en el inicio de sesión
  const handleFailure = () => {
    console.error("Error al iniciar sesión.");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          padding: "20px",
        }}
      >
        <h1>¡Bienvenido a Animatch! 🐾</h1>
        <p>Conecta mascotas rescatadas con familias amorosas.</p>

        {/* Botón de inicio de sesión centrado */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
        </div>

        {/* Footer */}
        <footer
          style={{
            marginTop: "50px",
            borderTop: "1px solid #ccc",
            paddingTop: "20px",
          }}
        >
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