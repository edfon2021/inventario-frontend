import "../styles/ventas.css";

export default function VentasClienteForm({ cliente, actualizarCliente }) {
  return (
    <div className="ventas__cliente">
      <h2 className="ventas__title">Datos del Cliente</h2>

      <input
        className="ventas__input"
        type="text"
        placeholder="Nombre"
        name="nombre"
        value={cliente.nombre}
        onChange={actualizarCliente}
      />

      <input
        className="ventas__input"
        type="text"
        placeholder="Apellidos"
        name="apellidos"
        value={cliente.apellidos}
        onChange={actualizarCliente}
      />

      <input
        className="ventas__input"
        type="text"
        placeholder="Cédula"
        name="cedula"
        value={cliente.cedula}
        onChange={actualizarCliente}
      />

      <input
        className="ventas__input"
        type="text"
        placeholder="Dirección"
        name="direccion"
        value={cliente.direccion}
        onChange={actualizarCliente}
      />

      <label className="ventas__label">Fecha de la venta</label>
      <input
        className="ventas__input"
        type="date"
        name="fecha"
        value={cliente.fecha}
        onChange={actualizarCliente}
      />
    </div>
  );
}
