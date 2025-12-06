export default function InventarioTable({ productos, onEditar, onEliminar}) {
  return (
    <div className="inventario-table">
      <h2>Lista de Productos</h2>

      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Marca</th>
            <th>Compra</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No hay productos aún
              </td>
            </tr>
          ) : (
            productos.map((p) => (
              <tr key={p.id}>
                <td>{p.sku}</td>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>{p.marca}</td>
                <td>${p.precioCompra}</td>
                <td>{p.cantidad}</td>
                <td>
                  <button
                    className="btn-editar"
                    type="button"
                    onClick={() => {
                      console.log("CLICK EDITAR:", p);
                      onEditar(p);
                    }}
                  >
                    ✏️
                  </button>

                  <button className="btn-eliminar" type="button" onClick={() => onEliminar(p.id)}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
