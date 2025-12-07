import { useState } from "react";
import "../styles/ModalProveedor.css";

export default function ModalProveedor({ visible, onClose, onSaved }) {
  if (!visible) return null;

  const API = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: ""
  });

  function actualizar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function guardar() {
    if (!form.nombre.trim()) {
      alert("El nombre del proveedor es obligatorio.");
      return;
    }

    fetch(`${API}/api/proveedores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then((r) => r.json())
      .then(() => {
         alert("Proveedor guardado exitosamente");

         if (typeof onSaved === "function") onSaved();
         if (typeof onClose === "function") onClose();
      })
      .catch(err => console.error("Error guardando proveedor:", err));
  }

  return (
    <div className="modal-overlay">
      <div className="modal proveedor-modal">

        <h3>Agregar Proveedor</h3>

        <label>Nombre</label>
        <input name="nombre" value={form.nombre} onChange={actualizar} />

        <label>Teléfono</label>
        <input name="telefono" value={form.telefono} onChange={actualizar} />

        <label>Email</label>
        <input name="email" value={form.email} onChange={actualizar} />

        <div className="proveedor-modal__actions">
          <button className="btn-save" onClick={guardar}>Guardar</button>
          <button className="btn-close" onClick={onClose}>Cancelar</button>
        </div>

      </div>
    </div>
  );
}
