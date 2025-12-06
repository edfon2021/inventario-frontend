import "../styles/ventas.css";

export default function VentasAgregarProducto({
  productos = [],
  productoSeleccionado,
  setProductoSeleccionado,
  cantidad,
  setCantidad,
  agregarDetalle
}) {
  return (
    <div className="ventas__productos">
      <h2 className="ventas__title">Agregar Productos</h2>

      <select
        className="ventas__select"
        value={productoSeleccionado}
        onChange={(e) => setProductoSeleccionado(e.target.value)}
      >
        <option value="">-- Seleccionar producto --</option>

        {Array.isArray(productos) && productos.length > 0 ? (
          productos.map(p => (
            <option key={p.id} value={p.id}>
              {p.nombre} (${p.precioVenta})
            </option>
          ))
        ) : (
          <option disabled>Cargando productos...</option>
        )}
      </select>

      <input
        className="ventas__input ventas__input--cantidad"
        type="number"
        min="1"
        value={cantidad}
        onChange={(e) => setCantidad(parseInt(e.target.value))}
      />

      <button className="ventas__btn" onClick={agregarDetalle}>
        Agregar
      </button>
    </div>
  );
}
