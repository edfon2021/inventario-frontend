import "../styles/ventas.css";

export default function VentasTabla({ detalles, eliminarDetalle }) {
  return (
    <div className="ventas__tabla">
      <h2 className="ventas__title">Detalle de Venta</h2>

      <table className="ventas__table">
        <thead className="ventas__table-head">
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {detalles.map(item => (
            <tr key={item.id} className="ventas__fila">
              <td>{item.nombre}</td>
              <td>${item.precio}</td>
              <td>{item.cantidad}</td>
              <td>${item.subtotal}</td>
              <td>
                <button
                  className="ventas__btn-eliminar"
                  onClick={() => eliminarDetalle(item.id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
