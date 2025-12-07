import { useState, useEffect } from "react";
import InventarioForm from "../components/InventarioForm";
import InventarioTable from "../components/InventarioTable";
import ModalEditar from "../components/ModalEditar";
import "../styles/inventario.css";
import FormNavbar from "../components/FormNavbar";
import "../styles/form-navbar.css";

export default function InventarioPage() {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);

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
  }, []);

  function agregarProducto(nuevo) {
    fetch(`${API}/api/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo),
    })
      .then(r => (r.ok ? r.json() : Promise.reject("Error guardando producto")))
      .then((res) => {
        setProductos((prev) => [...prev, { ...nuevo, id: res.id }]);
      })
      .catch((err) => {
        console.error("Error agregando:", err);
        alert("No se pudo guardar el producto.");
      });
  }

  function abrirEditar(producto) {
    setProductoEditar(producto);
  }

  function guardarCambios(datos) {
    fetch(`${API}/api/productos/${datos.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    })
      .then(r => (r.ok ? r.json() : Promise.reject("Error actualizando")))
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

  function eliminarProducto(id) {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

    fetch(`${API}/api/productos/${id}`, { method: "DELETE" })
      .then(r => (r.ok ? r.json() : Promise.reject("Error eliminando")))
      .then(() => {
        setProductos((prev) => prev.filter((p) => p.id !== id));
      })
      .catch((err) => {
        console.error("Error eliminando:", err);
        alert("No se pudo eliminar el producto.");
      });
  }

  return (
    <div className="inventario-container">
      <FormNavbar title="Gestión de Inventario" />

      <InventarioForm onGuardar={agregarProducto} />

      <InventarioTable
        productos={productos}
        onEditar={abrirEditar}
        onEliminar={eliminarProducto}
      />

      <ModalEditar
        producto={productoEditar}
        onClose={() => setProductoEditar(null)}
        onSave={guardarCambios}
      />
    </div>
  );
}
