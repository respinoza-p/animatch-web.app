import React from "react";

const regex = {
  nombre: /^[a-zA-Z\s]+$/,
  edad: /^[0-9]{1,2}$/,
  peso: /^\d+(\.\d{1,2})?$/,
  observaciones: /^.{10,}$/,
};

const AnimalForm = ({ formData, setFormData, options, handleSubmit }) => {
  // Obtiene la fecha actual en formato YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

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
      {/* Nombre y Edad */}
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

      {/* Peso y Sexo */}
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
          <select
            className="form-select"
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione...</option>
            {options.sexo.map((op) => (
              <option key={op._id} value={op.valor}>
                {op.valor}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ¿Tiene Chip? y ¿Requiere alimentación especial? */}
      <div className="row mt-3">
        <div className="col-md-6">
          <label className="form-label">¿Tiene Chip?</label>
          <select
            className="form-select"
            name="chip"
            value={formData.chip || ""}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione...</option>
            {options.chip &&
              options.chip.map((op) => (
                <option key={op._id} value={op.valor}>
                  {op.valor}
                </option>
              ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">¿Requiere alimentación especial?</label>
          <select
            className="form-select"
            name="alimentacion"
            value={formData.alimentacion || ""}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione...</option>
            {options.alimentacion &&
              options.alimentacion.map((op) => (
                <option key={op._id} value={op.valor}>
                  {op.valor}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Vacunas y Esterilizado/Castrado */}
      <div className="row mt-3">
        <div className="col-md-4">
          <label className="form-label">Vacunas</label>
          <select
            className="form-select"
            name="vacuna"
            value={formData.vacuna || ""}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione...</option>
            {options.vacuna.map((op) => (
              <option key={op._id} value={op.valor}>
                {op.valor}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Esterilizado/Castrado</label>
          <select
            className="form-select"
            name="esterilizado"
            value={formData.esterilizado || ""}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione...</option>
            {options.esterilizado.map((op) => (
              <option key={op._id} value={op.valor}>
                {op.valor}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Raza y Tamaño */}
      <div className="row mt-3">
        <div className="col-md-4">
          <label className="form-label">Raza</label>
          <select
            className="form-select"
            name="raza"
            value={formData.raza || ""}
            onChange={handleChange}
            required>
            <option value="">Seleccione...</option>
            {options.raza &&
              options.raza.map((op) => (
                <option key={op._id} value={op.valor}>
                  {op.valor}
                </option>
              ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Tamaño</label>
          <select
            className="form-select"
            name="tamAnimal"
            value={formData.tamAnimal || ""}
            onChange={handleChange}
            required>
            <option value="">Seleccione...</option>
            {options.tamAnimal &&
              options.tamAnimal.map((op) => (
                <option key={op._id} value={op.valor}>
                  {op.valor}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Fecha Nacimiento, Fecha Rescate y Cantidad de Adopciones Anteriores */}
      <div className="row mt-3">
        <div className="col-md-4">
          <label className="form-label">Fecha Nacimiento</label>
          <input
            type="date"
            className="form-control"
            name="fechaNacimiento"
            value={formData.fechaNacimiento || today}
            onChange={handleChange}
            required/>
        </div>
        <div className="col-md-4">
          <label className="form-label">Fecha Rescate</label>
          <input
            type="date"
            className="form-control"
            name="fechaRescate"
            value={formData.fechaRescate || today}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Cantidad de Adopciones Anteriores</label>
          <input
            type="number"
            className="form-control"
            name="cantAdopciones"
            value={formData.cantAdopciones || 0}
            onChange={handleChange}
            min="0"
            max="10"
            required/>
        </div>
      </div>

      {/* Nuevos campos: Le gusta hacer ejercicio y Caracter */}
      <div className="row mt-3">
        <div className="col-md-6">
          <label className="form-label">Le gusta hacer ejercicio</label>
          <select
            className="form-select"
            name="tipoActividad"
            value={formData.tipoActividad || ""}
            onChange={handleChange}
            required>
            <option value="">Seleccione...</option>
            {options.tipoActividad &&
              options.tipoActividad.map((op) => (
                <option key={op._id} value={op.valor}>
                  {op.valor}
                </option>
              ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Caracter</label>
          <select
            className="form-select"
            name="caracter"
            value={formData.caracter || ""}
            onChange={handleChange}
            required>
            <option value="">Seleccione...</option>
            {options.caracter &&
              options.caracter.map((op) => (
                <option key={op._id} value={op.valor}>
                  {op.valor}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Nuevos campos: Entrenamiento y Cuidados */}
      <div className="row mt-3">
        <div className="col-md-6">
          <label className="form-label">Entrenamiento</label>
          <select
            className="form-select"
            name="tipoEntrenamiento"
            value={formData.tipoEntrenamiento || ""}
            onChange={handleChange}
            required>
            <option value="">Seleccione...</option>
            {options.tipoEntrenamiento &&
              options.tipoEntrenamiento.map((op) => (
                <option key={op._id} value={op.valor}>
                  {op.valor}
                </option>
              ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Cuidados</label>
          <select
            className="form-select"
            name="cuidados"
            value={formData.cuidados || ""}
            onChange={handleChange}
            required>
            <option value="">Seleccione...</option>
            {options.cuidados &&
              options.cuidados.map((op) => (
                <option key={op._id} value={op.valor}>
                  {op.valor}
                </option>
              ))}
          </select>
        </div>
      </div>      

      {/* Nuevos campos: Problemas de comportamiento y Relación con otros animales */}
      <div className="row mt-3">
        <div className="col-md-6">
          <label className="form-label">Problemas de comportamiento</label>
          <select
            className="form-select"
            name="problemaComportamiento"
            value={formData.problemaComportamiento || ""}
            onChange={handleChange}
            required>
            <option value="">Seleccione...</option>
            {options.problemaComportamiento &&
              options.problemaComportamiento.map((op) => (
                <option key={op._id} value={op.valor}>
                  {op.valor}
                </option>
              ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Relación con otros animales</label>
          <select
            className="form-select"
            name="relacionOtrosAnimales"
            value={formData.relacionOtrosAnimales || ""}
            onChange={handleChange}
            required>
            <option value="">Seleccione...</option>
            {options.relacionOtrosAnimales &&
              options.relacionOtrosAnimales.map((op) => (
                <option key={op._id} value={op.valor}>
                  {op.valor}
                </option>
              ))}
          </select>
        </div>
      </div>
      {/* Nuevos campos: Perro apto para y Pelecha o tiene caspa */}
      <div className="row mt-3">
        <div className="col-md-6">
          <label className="form-label">Perro apto para</label>
          <select
            className="form-select"
            name="perroAptoPara"
            value={formData.perroAptoPara || ""}
            onChange={handleChange}
            required>
            <option value="">Seleccione...</option>
            {options.perroAptoPara &&
              options.perroAptoPara.map((op) => (
                <option key={op._id} value={op.valor}>
                  {op.valor}
                </option>
              ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Pelecha o tiene caspa</label>
          <select
            className="form-select"
            name="pelechaCaspa"
            value={formData.pelechaCaspa || ""}
            onChange={handleChange}
            required>
            <option value="">Seleccione...</option>
            {options.pelechaCaspa &&
              options.pelechaCaspa.map((op) => (
                <option key={op._id} value={op.valor}>
                  {op.valor}
                </option>
              ))}
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Registrar
      </button>
    </form>
  );
};

export default AnimalForm;