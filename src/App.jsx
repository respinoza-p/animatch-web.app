import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import HomePage from "./HomePage";
import RegistroAnimal from "./RegistroAnimal";
import HacerMatch from "./HacerMatch";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";
import NotFound from "./NotFound";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const newUser = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      console.error("Error al decodificar token JWT:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/home" />
              ) : (
                <div className="container text-center mt-5">
                  <h1 className="display-4">¡Bienvenido a Animatch! 🐾</h1>
                  <p className="lead">Conecta mascotas rescatadas con familias amorosas.</p>
                  <div className="d-flex justify-content-center my-4">
                    <GoogleLogin onSuccess={handleSuccess} onError={() => console.error("Error en el login")} />
                  </div>
                </div>
              )
            }
          />
          <Route path="/home" element={<HomePage user={user} setUser={setUser} />} />
          <Route path="/registro-animal" element={<RegistroAnimal user={user} setUser={setUser} />} />
          <Route path="/hacer-match" element={<HacerMatch user={user} setUser={setUser} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;