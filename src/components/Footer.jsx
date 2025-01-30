import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light text-center py-3 border-top mt-5">
      <p className="mb-0">&copy; {new Date().getFullYear()} Animatch. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;