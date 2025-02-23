import React, { useState } from "react";

const regex = {
  nombre: /^[a-zA-Z\s]+$/,
  edad: /^[0-9]{1,2}$/,
  peso: /^\d+(\.\d{1,2})?$/,
  observaciones: /^.{10,}$/,
};

const AnimalForm = ({ formData, setFormData, options, handleSubmit }) => {
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file && !["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        alert("Formato de imagen no válido. Solo JPG, JPEG y PNG.");
        return;
      }
      setFormData({
        ...formData,
        foto: file,
        fotoPreview: URL.createObjectURL(file),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Edad</label>
          <input
            type="text"
            className="form-control"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-4">
          <label className="form-label">Peso (kg)</label>
          <input
            type="text"
            className="form-control"
            name="peso"
            value={formData.peso}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Sexo</label>
          <select className="form-select" name="sexo" value={formData.sexo} onChange={handleChange} required>
            <option value="">Seleccione...</option>
            {options.sexo.map((op) => (
              <option key={op._id} value={op.valor}>
                {op.valor}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-4">
          <label className="form-label">Vacunas</label>
          <select className="form-select" name="vacuna" value={formData.vacuna || ""} onChange={handleChange} required>
            <option value="">Seleccione...</option>
            {options.vacuna.map((op) => (
              <option key={op._id} value={op.valor}>
                {op.valor}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-3">Registrar</button>
    </form>
  );
};

export default AnimalForm;