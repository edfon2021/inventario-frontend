import { useState, useEffect } from "react";
import InventarioForm from "../components/InventarioForm";
import InventarioTable from "../components/InventarioTable";
import ModalEditar from "../components/ModalEditar";
import ModalPedido from "../components/ModalPedido";
import "../styles/inventario.css";
import FormNavbar from "../components/FormNavbar";
import "../styles/form-navbar.css";

export default function InventarioPage() {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);

  // Nuevo → para pedidos
  const [productoPedido, setProductoPedido] = useState(null);

  // Nuevo → proveedores
  const [proveedores, setProveedores] = useState([]);

  const API = import.meta.env.VITE_API_URL;

  // Cargar productos
  useEffect(() => {
    if (!API) {
      console.error("❌ ERROR: VITE_API_URL no está definida");
      return;
    }

    (async () => {
      try {
        const r = await fetch(`${API}/api/productos`);
        if (!r.ok) throw new Error("Error cargando inventario");
        const data = await r.json();
        setProductos(data);
      } catch (err) {
        console.error("Error:", err);
      }
    })();
  }, [API]);

  // NUEVO → Cargar proveedores
  useEffect(() => {
    if (!API) return;

    fetch(`${API}/api/proveedores`)
      .then((r) => r.json())
      .then((data) => setProveedores(data))
      .catch((err) => console.error("Error cargando proveedores:", err));
  }, [API]);

  // Crear producto nuevo
  function agregarProducto(nuevo) {
    // CORREGIDO: Se agregaron las backticks (`)
    fetch(`${API}/api/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject("Error guardando producto")))
      .then((res) => {
        setProductos((prev) => [...prev, { ...nuevo, id: res.id }]);
      })
      .catch((err) => {
        console.error("Error agregando:", err);
        alert("No se pudo guardar el producto.");
      });
  }

  // Abrir modal edición
  function abrirEditar(producto) {
    setProductoEditar(producto);
  }

  // Guardar cambios
  function guardarCambios(datos) {
    // CORREGIDO: Se agregaron las backticks (`)
    fetch(`${API}/api/productos/${datos.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject("Error actualizando")))
      .then(() => {
        setProductos((prev) =>
          prev.map((p) => (p.id === datos.id ? { ...p, ...datos } : p))
        );
        setProductoEditar(null);
      })
      .catch((err) => {
        console.error("Error actualizando:", err);
        alert("No se pudo actualizar el producto.");
      });
  }

  // Eliminar producto
  function eliminarProducto(id) {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

    fetch(`${API}/api/productos/${id}`, { method: "DELETE" })
      .then((r) => (r.ok ? r.json() : Promise.reject("Error eliminando")))
      .then(() => {
        setProductos((prev) => prev.filter((p) => p.id !== id));
      })
      .catch((err) => {
        console.error("Error eliminando:", err);
        alert("No se pudo eliminar el producto.");
      });
  }

  // NUEVO → Abrir modal para pedidos
  function abrirPedido(producto) {
    setProductoPedido(producto);
  }

  // NUEVO → Guardar pedido (solo suma al inventario)
  async function guardarPedido(pedido) {
  try {
    // Registrar el pedido
    const r = await fetch(`${API}/api/pedidos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido),
    });

    if (!r.ok) throw new Error("Error registrando pedido");

    // Buscar producto actual
    const productoActual = productos.find(p => p.id === pedido.productoId);

    // Calcular datos nuevos (solo se reemplaza, NO se promedia)
    const nuevosDatos = {
      precioCompra: pedido.precioCompra,
      precioVenta: pedido.precioVenta,
      cantidad: Number(productoActual.cantidad) + Number(pedido.cantidad),
    };

    // Actualizar producto en BD
    const update = await fetch(`${API}/api/productos/${pedido.productoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevosDatos),
    });

    // Refrescar inventario en pantalla
    setProductos(prev =>
      prev.map(p =>
        p.id === pedido.productoId
          ? { ...p, ...nuevosDatos }
          : p
      )
    );

    setProductoPedido(null);
    alert("Pedido registrado con éxito");

  } catch (err) {
    console.error("Error pedido:", err);
    alert("No se pudo registrar el pedido.");
  }
}

//Recarga proveedores
function recargarProveedores() {
  fetch(`${API}/api/proveedores`)
    .then(r => r.json())
    .then(data => setProveedores(data))
    .catch(err => console.error("Error recargando proveedores:", err));
}

  return (
    <div className="inventario-container">
      <FormNavbar title="Gestión de Inventario" />

      <InventarioForm onGuardar={agregarProducto} />

      <InventarioTable
        productos={productos}
        onEditar={abrirEditar}
        onEliminar={eliminarProducto}
        onPedido={abrirPedido}
      />

      <ModalEditar
        producto={productoEditar}
        onClose={() => setProductoEditar(null)}
        onSave={guardarCambios}
      />

      <ModalPedido
          producto={productoPedido}
          proveedores={proveedores}
          onClose={() => setProductoPedido(null)}
          onSave={guardarPedido}
          onRecargarProveedores={recargarProveedores}   
      />
    </div>
  );
}