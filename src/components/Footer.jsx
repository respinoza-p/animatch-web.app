import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: "50px",
        padding: "15px",
        backgroundColor: "#f8f9fa",
        borderTop: "1px solid #ddd",
      }}
    >
      <p>&copy; {new Date().getFullYear()} Animatch. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;