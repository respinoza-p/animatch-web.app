import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Usuario decodificado:", decoded);
    setUser({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    });
    navigate("/home");
  };

  const handleFailure = () => {
    console.error("Error al iniciar sesión.");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="container text-center mt-5">
        <h1 className="display-4">¡Bienvenido a Animatch! 🐾</h1>
        <p className="lead">Conecta mascotas rescatadas con familias amorosas.</p>

        <div className="d-flex justify-content-center my-4">
          <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
        </div>

        <footer className="mt-5 border-top pt-3">
          <p>
            <a href="/privacy-policy" className="me-3">
              Política de Privacidad
            </a>
            <a href="/terms-of-service">Condiciones del Servicio</a>
          </p>
        </footer>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;