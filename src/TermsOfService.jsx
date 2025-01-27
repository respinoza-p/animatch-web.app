import React from "react";

const TermsOfService = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Condiciones del Servicio de Animatch 🐾</h1>
      <p>
        Bienvenido a Animatch. Al utilizar nuestro servicio, aceptas las
        siguientes condiciones. Por favor, léelas cuidadosamente.
      </p>

      <h2>Uso del Servicio</h2>
      <p>
        Este servicio está diseñado para facilitar el registro y adopción de
        animales rescatados. Los usuarios deben utilizarlo de manera ética y
        responsable, respetando los objetivos del sistema y las normativas
        aplicables.
      </p>

      <h2>Responsabilidades del Usuario</h2>
      <p>
        Al utilizar Animatch, aceptas:
        <ul>
          <li>Proporcionar información veraz y actualizada.</li>
          <li>Respetar los derechos de los demás usuarios y fundaciones.</li>
          <li>No utilizar el servicio para actividades fraudulentas o ilícitas.</li>
        </ul>
      </p>

      <h2>Limitación de Responsabilidad</h2>
      <p>
        Animatch no se hace responsable de:
        <ul>
          <li>Decisiones de adopción tomadas por las fundaciones o usuarios.</li>
          <li>Información inexacta proporcionada por los usuarios.</li>
          <li>Cualquier problema surgido fuera del alcance de nuestro sistema.</li>
        </ul>
      </p>

      <h2>Modificaciones</h2>
      <p>
        Nos reservamos el derecho de modificar estas condiciones en cualquier
        momento. Te recomendamos revisar esta página regularmente para estar al
        tanto de los cambios.
      </p>

      <h2>Contacto</h2>
      <p>
        Si tienes preguntas sobre estas condiciones, contáctanos en:
        <br />
        📧 <a href="mailto:contacto@croqueton.cl">contacto@croqueton.cl</a>
      </p>
    </div>
  );
};

export default TermsOfService;