import { useState, useEffect } from "react";
import "./ModalEditar.css";
import ModalProveedor from "./ModalProveedor"; // ← IMPORTANTE

export default function ModalPedido({ producto, proveedores = [], onClose, onSave, onRecargarProveedores }) {

  const [form, setForm] = useState({
    productoId: "",
    proveedorId: "",
    precioCompra: "",
    precioVenta: "",
    cantidad: ""
  });

  const [mostrarProveedorModal, setMostrarProveedorModal] = useState(false);

  // Cargar datos iniciales cuando recibe producto
  useEffect(() => {
    if (producto) {
      setForm({
        productoId: producto.id,
        proveedorId: "",
        precioCompra: producto.precioCompra || "",
        precioVenta: producto.precioVenta || "",
        cantidad: ""
      });
    }
  }, [producto]);

  function actualizar(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function guardar() {
    if (!form.proveedorId) {
      alert("Seleccione un proveedor.");
      return;
    }
    if (!form.cantidad || Number(form.cantidad) <= 0) {
      alert("Ingrese una cantidad válida.");
      return;
    }

    onSave(form);
  }

  if (!producto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Registrar Pedido — {producto.nombre}</h2>

        {/* PROVEEDOR + BOTÓN AGREGAR */}
        <div className="proveedor-group">
  <div className="proveedor-group__left">
    <label>Proveedor</label>
    <select
      name="proveedorId"
      value={form.proveedorId}
      onChange={actualizar}
    >
      <option value="">Seleccione un proveedor</option>
      {proveedores.map(p => (
        <option key={p.id} value={p.id}>
          {p.nombre}
        </option>
      ))}
    </select>
  </div>

  <button
    type="button"
    className="proveedor-group__add"
    onClick={() => setMostrarProveedorModal(true)}
  >
    ➕
  </button>
</div>

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

        <label>Cantidad (se sumará al inventario)</label>
        <input
          type="number"
          name="cantidad"
          value={form.cantidad}
          onChange={actualizar}
        />

        <div className="modal-actions">
          <button onClick={guardar} className="btn-save">Registrar Pedido</button>
          <button onClick={onClose} className="btn-close">Cancelar</button>
        </div>

        {/* MODAL PARA AGREGAR PROVEEDOR */}
        <ModalProveedor
          visible={mostrarProveedorModal}
          onClose={() => setMostrarProveedorModal(false)}
          onSaved={() => {
            setMostrarProveedorModal(false);
            if (typeof onRecargarProveedores === "function") {
               onRecargarProveedores();
              }
          }}
        />

      </div>
    </div>
  );
}
