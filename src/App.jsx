import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function App() {
  const handleSuccess = (credentialResponse) => {
    console.log("Credenciales de inicio de sesión:", credentialResponse);
  };

  const handleFailure = () => {
    console.error("Error al iniciar sesión.");
  };

  return (
    <GoogleOAuthProvider clientId="TU_CLIENT_ID_DE_GOOGLE">
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>¡Bienvenido a Animatch!</h1>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;