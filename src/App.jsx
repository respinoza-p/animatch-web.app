import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Decodifica el token JWT de Google
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [user, setUser] = useState(null); // Estado para almacenar datos del usuario
  const navigate = useNavigate();

  // Manejo del inicio de sesión exitoso
  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Usuario decodificado:", decoded);

    // Almacena el nombre y otros datos del usuario en el estado
    setUser({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    });

    // Redirige a la página principal
    navigate("/home");
  };

  // Manejo de errores en el inicio de sesión
  const handleFailure = () => {
    console.error("Error al iniciar sesión.");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ textAlign: "center", marginTop: "50px", padding: "20px" }}>
              <h1>¡Bienvenido a Animatch! 🐾</h1>
              <p>Conecta mascotas rescatadas con familias amorosas.</p>

              {/* Botón de inicio de sesión */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px 0",
                }}
              >
                <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
              </div>
            </div>
          }
        />
        <Route
          path="/home"
          element={<HomePage user={user} />} // Pasa el usuario como prop
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;