import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Para decodificar el token JWT de Google

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const navigate = useNavigate();

  // Estado para almacenar los datos del usuario
  const [user, setUser] = useState(null);

  const handleSuccess = (credentialResponse) => {
    console.log("Credenciales de inicio de sesión:", credentialResponse);

    // Decodifica el token JWT para obtener la información del usuario
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Información del usuario decodificada:", decoded);

    // Actualiza el estado con la información del usuario
    setUser({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    });

    // Redirige a la página principal
    navigate("/home");
  };

  const handleFailure = () => {
    console.error("Error al iniciar sesión.");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div style={{ textAlign: "center", marginTop: "50px", padding: "20px" }}>
        <h1>¡Bienvenido a Animatch! 🐾</h1>
        <p>Conecta mascotas rescatadas con familias amorosas.</p>

        {/* Botón de inicio de sesión centrado */}
        <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
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