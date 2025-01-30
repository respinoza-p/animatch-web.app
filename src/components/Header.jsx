import React from "react";

const Header = ({ userName }) => {
  return (
    <nav className="navbar navbar-light bg-light border-bottom mb-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="h3 m-0">Animatch 🐾</h1>
        <div>
          <span className="me-3">Hola, {userName}!</span>
          <button className="btn btn-danger btn-sm">Cerrar Sesión</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;