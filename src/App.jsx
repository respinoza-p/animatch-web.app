import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import HomePage from "./HomePage";
import RegistroAnimal from "./RegistroAnimal";
import HacerMatch from "./HacerMatch";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";
import NotFound from "./NotFound"; // Página de error 404
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
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
          <Route path="/" element={user ? <Navigate to="/home" /> : <LoginPage handleSuccess={handleSuccess} />} />
          <Route path="/home" element={<HomePage user={user} setUser={setUser} />} />
          <Route path="/registro-animal" element={<RegistroAnimal />} />
          <Route path="/hacer-match" element={<HacerMatch />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />

          {/* ✅ Página de error personalizada en vez de redirigir a "/" */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;