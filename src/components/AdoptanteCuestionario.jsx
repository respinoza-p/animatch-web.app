import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const AdoptanteCuestionario = ({ formData, setFormData, options, handleSubmit }) => {
  const token = useAuth();

  return (
    <div style={{ position: "relative" }}>
      <form onSubmit={handleSubmit}>

        {/* Campo: ¿Quiénes componen su hogar? */}
        <div className="mb-3">
          <label className="form-label">¿Quiénes componen su hogar?</label>
          <select
            className="form-select"
            value={formData.componenHogar}
            onChange={(e) => setFormData({ ...formData, componenHogar: e.target.value })}
          >
            <option value="">Seleccione una opción</option>
            {options?.componenHogar?.length > 0 ? (
              options.componenHogar.map((item) => (
                <option key={item._id} value={item._id}>{item.valor}</option>
              ))
            ) : (
              <option disabled>Cargando...</option>
            )}
          </select>
        </div>

        {/* Campo: ¿Qué frase te identifica más? */}
        <div className="mb-3">
          <label className="form-label">¿Qué frase te identifica más?</label>
          <select
            className="form-select"
            value={formData.fraseIdentifica}
            onChange={(e) => setFormData({ ...formData, fraseIdentifica: e.target.value })}
          >
            <option value="">Seleccione una opción</option>
            {options?.fraseIdentifica?.length > 0 ? (
              options.fraseIdentifica.map((item) => (
                <option key={item._id} value={item._id}>{item.valor}</option>
              ))
            ) : (
              <option disabled>Cargando...</option>
            )}
          </select>
        </div>

        {/* Campo: ¿Por qué deseas adoptar? */}
        <div className="mb-3">
          <label className="form-label">¿Por qué deseas adoptar?</label>
          <select
            className="form-select"
            value={formData.porqueDeseaAdoptar}
            onChange={(e) => setFormData({ ...formData, porqueDeseaAdoptar: e.target.value })}
          >
            <option value="">Seleccione una opción</option>
            {options?.porqueDeseaAdoptar?.length > 0 ? (
              options.porqueDeseaAdoptar.map((item) => (
                <option key={item._id} value={item._id}>{item.valor}</option>
              ))
            ) : (
              <option disabled>Cargando...</option>
            )}
          </select>
        </div>

        {/* Campo: ¿Alguno tiene alergias o algún impedimento de salud? */}
        <div className="mb-3">
          <label className="form-label">¿Alguno tiene alergias o algún impedimento de salud relacionado a la tenencia de un perrito?</label>
          <select
            className="form-select"
            value={formData.alergiaEnfermedad}
            onChange={(e) => setFormData({ ...formData, alergiaEnfermedad: e.target.value })}
          >
            <option value="">Seleccione una opción</option>
            {options?.alergiaEnfermedad?.length > 0 ? (
              options.alergiaEnfermedad.map((item) => (
                <option key={item._id} value={item._id}>{item.valor}</option>
              ))
            ) : (
              <option disabled>Cargando...</option>
            )}
          </select>
        </div>

        {/* Campo: ¿Ha tenido animales antes? */}
        <div className="mb-3">
          <label className="form-label">¿Ha tenido animales antes?</label>
          <select
            className="form-select"
            value={formData.haTenidoAnimales}
            onChange={(e) => setFormData({ ...formData, haTenidoAnimales: e.target.value })}
          >
            <option value="">Seleccione una opción</option>
            {options?.haTenidoAnimales?.length > 0 ? (
              options.haTenidoAnimales.map((item) => (
                <option key={item._id} value={item._id}>{item.valor}</option>
              ))
            ) : (
              <option disabled>Cargando...</option>
            )}
          </select>
        </div>

        {/* Campo: Actualmente tengo */}
        <div className="mb-3">
          <label className="form-label">Actualmente tengo:</label>
          <select
            className="form-select"
            value={formData.actualmenteTengo}
            onChange={(e) => setFormData({ ...formData, actualmenteTengo: e.target.value })}
          >
            <option value="">Seleccione una opción</option>
            {options?.actualmenteTengo?.length > 0 ? (
              options.actualmenteTengo.map((item) => (
                <option key={item._id} value={item._id}>{item.valor}</option>
              ))
            ) : (
              <option disabled>Cargando...</option>
            )}
          </select>
        </div>

        {/* Campo: Busco un perro de tamaño */}
        <div className="mb-3">
          <label className="form-label">Busco un perro de tamaño:</label>
          <select
            className="form-select"
            value={formData.tamanioAnimal}
            onChange={(e) => setFormData({ ...formData, tamanioAnimal: e.target.value })}
          >
            <option value="">Seleccione una opción</option>
            {options?.tamanioAnimal?.length > 0 ? (
              options.tamanioAnimal.map((item) => (
                <option key={item._id} value={item._id}>{item.valor}</option>
              ))
            ) : (
              <option disabled>Cargando...</option>
            )}
          </select>
        </div>

         {/* Campo: Busco un perro */}
        <div className="mb-3">
          <label className="form-label">Busco un perro:</label>
          <select
            className="form-select"
            value={formData.edadAnimal}
            onChange={(e) => setFormData({ ...formData, edadAnimal: e.target.value })}
          >
            <option value="">Seleccione una opción</option>
            {options?.edadAnimal?.length > 0 ? (
              options.edadAnimal.map((item) => (
                <option key={item._id} value={item._id}>{item.valor}</option>
              ))
            ) : (
              <option disabled>Cargando...</option>
            )}
          </select>
        </div> 

        {/* Campo: ¿Qué opina de la esterilización? */}
        <div className="mb-3">
          <label className="form-label">¿Qué opina de la esterilización?</label>
          <select
            className="form-select"
            value={formData.opinionEsteriliza}
            onChange={(e) => setFormData({ ...formData, opinionEsteriliza: e.target.value })}
          >
            <option value="">Seleccione una opción</option>
            {options?.opinionEsteriliza?.length > 0 ? (
              options.opinionEsteriliza.map((item) => (
                <option key={item._id} value={item._id}>{item.valor}</option>
              ))
            ) : (
              <option disabled>Cargando...</option>
            )}
          </select>
        </div>

        {/* Campo: ¿Está dispuest@ a adoptar perritos con problemas de comportamiento? */}
        <div className="mb-3">
          <label className="form-label">¿Está dispuest@ a adoptar perritos con problemas de comportamiento?</label>
          <select
            className="form-select"
            value={formData.dispuestoAdoptar}
            onChange={(e) => setFormData({ ...formData, dispuestoAdoptar: e.target.value })}
          >
            <option value="">Seleccione una opción</option>
            {options?.dispuestoAdoptar?.length > 0 ? (
              options.dispuestoAdoptar.map((item) => (
                <option key={item._id} value={item._id}>{item.valor}</option>
              ))
            ) : (
              <option disabled>Cargando...</option>
            )}
          </select>
        </div>        

        {/* Campo: Vivo en */}
        <div className="mb-3">
          <label className="form-label">Vivo en:</label>
          <select
            className="form-select"
            value={formData.vivoEn}
            onChange={(e) => setFormData({ ...formData, vivoEn: e.target.value })}
          >
            <option value="">Seleccione una opción</option>
            {options?.vivoEn?.length > 0 ? (
              options.vivoEn.map((item) => (
                <option key={item._id} value={item._id}>{item.valor}</option>
              ))
            ) : (
              <option disabled>Cargando...</option>
            )}
          </select>
        </div>

        {/* Campo: ¿Cuánto dinero piensa gastar mensualmente? */}
        <div className="mb-3">
          <label className="form-label">¿Cuánto dinero piensa gastar mensualmente?</label>
          <select
            className="form-select"
            value={formData.presupuestoMensual}
            onChange={(e) => setFormData({ ...formData, presupuestoMensual: e.target.value })}
          >
            <option value="">Seleccione una opción</option>
            {options?.presupuestoMensual?.length > 0 ? (
              options.presupuestoMensual.map((item) => (
                <option key={item._id} value={item._id}>{item.valor}</option>
              ))
            ) : (
              <option disabled>Cargando...</option>
            )}
          </select>
        </div>

         {/* Campo: ¿Es posible realizar paseos diarios? */}
         <div className="mb-3">
          <label className="form-label">¿Es posible realizar paseos diarios?</label>
          <select
            className="form-select"
            value={formData.paseosAnimal}
            onChange={(e) => setFormData({ ...formData, paseosAnimal: e.target.value })}
          >
            <option value="">Seleccione una opción</option>
            {options?.paseosAnimal?.length > 0 ? (
              options.paseosAnimal.map((item) => (
                <option key={item._id} value={item._id}>{item.valor}</option>
              ))
            ) : (
              <option disabled>Cargando...</option>
            )}
          </select>
        </div>

        {/* Campo: ¿Cuánto tiempo pasará la mascota sola en un día promedio? */}
        <div className="mb-3">
          <label className="form-label">¿Cuánto tiempo pasará la mascota sola en un día promedio?</label>
          <select
            className="form-select"
            value={formData.tiempoSoledadAnimal}
            onChange={(e) => setFormData({ ...formData, tiempoSoledadAnimal: e.target.value })}
          >
            <option value="">Seleccione una opción</option>
            {options?.tiempoSoledadAnimal?.length > 0 ? (
              options.tiempoSoledadAnimal.map((item) => (
                <option key={item._id} value={item._id}>{item.valor}</option>
              ))
            ) : (
              <option disabled>Cargando...</option>
            )}
          </select>
        </div>            
        
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
};

export default AdoptanteCuestionario;