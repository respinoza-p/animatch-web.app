import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [user, setUser] = useState(null);

  // Cargar usuario desde localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const newUser = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          {/* Página de inicio de sesión */}
          <Route path="/" element={
            user ? <Navigate to="/home" /> : (
              <div className="container text-center mt-5">
                <h1 className="display-4">¡Bienvenido a Animatch! 🐾</h1>
                <p className="lead">Conecta mascotas rescatadas con familias amorosas.</p>
                <div className="d-flex justify-content-center my-4">
                  <GoogleLogin onSuccess={handleSuccess} />
                </div>
              </div>
            )
          } />
          
          {/* Página principal después del login */}
          <Route path="/home" element={<HomePage user={user} setUser={setUser} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />

          {/* Redirigir rutas no encontradas */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;