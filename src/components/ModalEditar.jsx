import { useState, useEffect } from "react";
import "./ModalEditar.css";

export default function ModalEditar({ producto, onClose, onSave }) {


  const [form, setForm] = useState({
  id: "",
  precioCompra: "",
  precioVenta: "",
  cantidad: ""
});

useEffect(() => {
  if (producto) {
    setForm({
      id: producto.id,
      precioCompra: producto.precioCompra,
      precioVenta: producto.precioVenta,
      cantidad: producto.cantidad
    });
  }
}, [producto]);

  
  function actualizar(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function guardar() {
    onSave(form);
  }

  if (!producto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Producto - {producto.nombre}</h2>

        <label>Precio Compra</label>
        <input
          type="number"
          name="precioCompra"
          value={form.precioCompra}
          onChange={actualizar}
        />

        <label>Precio Venta</label>
        <input
          type="number"
          name="precioVenta"
          value={form.precioVenta}
          onChange={actualizar}
        />

        <label>Cantidad</label>
        <input
          type="number"
          name="cantidad"
          value={form.cantidad}
          onChange={actualizar}
        />

        <div className="modal-actions">
          <button onClick={guardar} className="btn-save">Guardar</button>
          <button onClick={onClose} className="btn-close">Cancelar</button>
        </div>
      </div>
    </div>
  );
}
