import { useEffect, useState, Fragment } from "react";
import "../styles/ModalVentas.css";

export default function ModalVentas({ visible, onClose }) {
  if (!visible) return null; // ← IMPORTANTE

  const API = import.meta.env.VITE_API_URL;

  const [ventas, setVentas] = useState([]);
  const [detalles, setDetalles] = useState({});
  const [expandida, setExpandida] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  // Cargar todas las ventas
  useEffect(() => {
    if (!API || !visible) return;

    fetch(`${API}/api/ventas`)
      .then((r) => r.json())
      .then((data) => setVentas(data))
      .catch((err) => console.error("Error cargando ventas:", err));
  }, [API, visible]);

  // Cargar detalle
  function cargarDetalle(ventaId) {
    if (expandida === ventaId) {
      setExpandida(null);
      return;
    }

    fetch(`${API}/api/ventas-detalle/${ventaId}`)
      .then((r) => r.json())
      .then((data) => {
        setDetalles((prev) => ({ ...prev, [ventaId]: data }));
        setExpandida(ventaId);
      })
      .catch((err) => console.error("Error cargando detalle:", err));
  }

  const ventasFiltradas = ventas.filter((v) => {
    const txt = busqueda.toLowerCase();
    return (
      v.nombreCliente?.toLowerCase().includes(txt) ||
      v.apellidosCliente?.toLowerCase().includes(txt) ||
      String(v.id).includes(txt) ||
      String(v.total).includes(txt)
    );
  });

  return (
    <div className="modal-overlay">
      <div className="modal ventas-modal">
        <h2 className="ventas-modal__title">🧾 Registro de Ventas</h2>

        <input
          type="text"
          className="ventas-modal__search"
          placeholder="Buscar por cliente, factura o total..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <table className="ventas-modal__table">
          <thead>
            <tr className="ventas-modal__row">
              <th className="ventas-modal__header"></th>
              <th className="ventas-modal__header">ID</th>
              <th className="ventas-modal__header">Cliente</th>
              <th className="ventas-modal__header">Total</th>
              <th className="ventas-modal__header">Fecha</th>
            </tr>
          </thead>

          <tbody>
            {ventasFiltradas.map((v) => (
              <Fragment key={v.id}>
                {/* FILA PRINCIPAL */}
                <tr className="ventas-modal__row">
                  <td className="ventas-modal__cell">
                    <button
                      className="ventas-modal__toggle"
                      onClick={() => cargarDetalle(v.id)}
                    >
                      {expandida === v.id ? "▼" : "▶"}
                    </button>
                  </td>

                  <td className="ventas-modal__cell">{v.id}</td>
                  <td className="ventas-modal__cell">
                    {v.nombreCliente} {v.apellidosCliente}
                  </td>
                  <td className="ventas-modal__cell">${v.total}</td>
                  <td className="ventas-modal__cell">
                    {v.fecha?.split("T")[0]}
                  </td>
                </tr>

                {/* FILA DETALLE */}
                {expandida === v.id && detalles[v.id] && (
                  <tr className="ventas-modal__detail">
                    <td></td>
                    <td colSpan="4">
                      <table className="ventas-modal__detail-table">
                        <thead>
                          <tr>
                            <th>SKU</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>

                        <tbody>
                          {detalles[v.id].map((d) => (
                            <tr key={d.detalleId}>
                              <td>{d.sku}</td>
                              <td>{d.nombre}</td>
                              <td>{d.cantidad}</td>
                              <td>${d.precio}</td>
                              <td>${d.subtotal}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>

        <button className="ventas-modal__close" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
