import { useState, useEffect } from "react";
import "./ModalEditar.css";

export default function PedidosModal({ visible, onClose }) {
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState("");

  const API = import.meta.env.VITE_API_URL;

  // Cargar pedidos al abrir
  useEffect(() => {
    if (!visible) return;

    fetch(`${API}/api/pedidos-detalle`)
      .then(r => r.json())
      .then(data => setPedidos(data))
      .catch(err => console.error("Error cargando pedidos:", err));
  }, [visible, API]);

  if (!visible) return null;

  // Filtrar pedidos
  const pedidosFiltrados = pedidos.filter(p =>
    p.producto.toLowerCase().includes(filtro.toLowerCase()) ||
    p.proveedor.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ maxWidth: "1000px", width: "95%",padding: "30px",fontSize: "18px" }}>

        <h2>📦 Registro de Pedidos</h2>

        <input
          type="text"
          placeholder="Buscar por producto o proveedor..."
          className="inventario-table__search"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />

        <div className="pedidos-table__container">
  <table className="pedidos-table__table">
    <thead>
      <tr className="pedidos-table__row">
        <th className="pedidos-table__header">ID</th>
        <th className="pedidos-table__header">Producto</th>
        <th className="pedidos-table__header">Proveedor</th>
        <th className="pedidos-table__header">Cantidad</th>
        <th className="pedidos-table__header">P. Compra</th>
      </tr>
    </thead>

    <tbody>
      {pedidosFiltrados.length === 0 ? (
        <tr className="pedidos-table__row">
          <td className="pedidos-table__no-data" colSpan="5">
            No hay pedidos registrados
          </td>
        </tr>
      ) : (
        pedidosFiltrados.map((p) => (
          <tr key={p.pedidoId} className="pedidos-table__row">
            <td className="pedidos-table__cell">{p.pedidoId}</td>
            <td className="pedidos-table__cell">{p.producto}</td>
            <td className="pedidos-table__cell">{p.proveedor}</td>
            <td className="pedidos-table__cell">{p.cantidad}</td>
            <td className="pedidos-table__cell">${p.precioCompra}</td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>


        <div className="modal-actions">
          <button className="btn-close" onClick={onClose}>Cerrar</button>
        </div>

      </div>
    </div>
  );
}
