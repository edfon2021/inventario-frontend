import { useState } from "react";

export default function InventarioTable({ productos, onEditar, onEliminar, onPedido }) {
  const [filtro, setFiltro] = useState("");

  const productosFiltrados = productos.filter((p) => {
    const texto = filtro.toLowerCase();
    return (
      p.sku.toLowerCase().includes(texto) ||
      p.nombre.toLowerCase().includes(texto) ||
      p.categoria.toLowerCase().includes(texto) ||
      p.marca.toLowerCase().includes(texto)
    );
  });

  return (
    <div className="inventario-table">

      <h2 className="inventario-table__title">Lista de Productos</h2>

      <input
        type="text"
        className="inventario-table__search"
        placeholder="Buscar producto, marca o SKU..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <table className="inventario-table__table">
        <thead>
          <tr className="inventario-table__row">
            <th className="inventario-table__header">SKU</th>
            <th className="inventario-table__header">Producto</th>
            <th className="inventario-table__header">Categoría</th>
            <th className="inventario-table__header">Marca</th>
            <th className="inventario-table__header">Compra</th>
            <th className="inventario-table__header">Cantidad</th>
            <th className="inventario-table__header">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productosFiltrados.length === 0 ? (
            <tr className="inventario-table__row">
              <td colSpan="7" className="inventario-table__no-data">
                No se encontraron productos
              </td>
            </tr>
          ) : (
            productosFiltrados.map((p) => (
              <tr key={p.id} className="inventario-table__row">
                <td className="inventario-table__cell">{p.sku}</td>
                <td className="inventario-table__cell">{p.nombre}</td>
                <td className="inventario-table__cell">{p.categoria}</td>
                <td className="inventario-table__cell">{p.marca}</td>
                <td className="inventario-table__cell">${p.precioCompra}</td>
                <td className="inventario-table__cell">{p.cantidad}</td>

                <td className="inventario-table__actions">
                 
                  <button className="btn-pedido" onClick={() => onPedido(p)}>
                    📦
                  </button>
                  <button
                    className="inventario-table__btn inventario-table__btn--edit"
                    onClick={() => onEditar(p)}
                    type="button"
                  >
                    ✏️
                  </button>

                  <button
                    className="inventario-table__btn inventario-table__btn--delete"
                    onClick={() => onEliminar(p.id)}
                    type="button"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
}