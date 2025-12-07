import { useState } from "react";
import PedidosModal from "../components/PedidosModal";
import VentasModal from "../components/ModalVentas";

export default function FormNavbar({ title }) {
  const [mostrarPedidos, setMostrarPedidos] = useState(false);
  const [mostrarVentas, setMostrarVentas] = useState(false);

  return (
    <>
      <nav className="form-navbar">
        <div className="form-navbar__left">
          <img src="/logo-unir.png" alt="UNIR Logo" className="form-navbar__logo" />
          <span className="form-navbar__title">{title}</span>
        </div>

        <div className="form-navbar__right">
          
          {/* Abrir Registro de Pedidos */}
          <button
            className="form-navbar__button"
            onClick={() => setMostrarPedidos(true)}
          >
            Registro de Pedidos
          </button>

          {/* Abrir Registro de Ventas */}
          <button
            className="form-navbar__button"
            onClick={() => setMostrarVentas(true)}
          >
            Registro de Ventas
          </button>
        </div>
      </nav>

      {/* Modales */}
      <PedidosModal
        visible={mostrarPedidos}
        onClose={() => setMostrarPedidos(false)}
      />

      <VentasModal
        visible={mostrarVentas}
        onClose={() => setMostrarVentas(false)}
      />
    </>
  );
}
