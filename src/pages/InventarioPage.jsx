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

  // Cargar productos desde el backend al iniciar
  useEffect(() => {
    fetch("/api/productos")
      .then(r => r.json())
      .then(data => setProductos(data));
  }, []);

  // Guardar producto nuevo
  function agregarProducto(nuevo) {
  fetch("/api/productos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevo)
  })
    .then(r => r.json())
    .then(res => {
      setProductos(prev => [...prev, { ...nuevo, id: res.id }]);
    })
    .catch(err => console.error("Error agregando:", err));
}
  // Abrir modal
  function abrirEditar(producto) {
    setProductoEditar(producto);
  }

// Guardar los cambios en productos
function guardarCambios(datos) {

  console.log("DATOS:", datos);

  fetch(`/api/productos/${datos.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  })
    .then(r => r.json())
    .then(() => {
      setProductos(prev =>
        prev.map(p =>
          p.id === datos.id
            ? { ...p, ...datos }
            : p
        )
      );

      setProductoEditar(null);
    })
    .catch(err => console.error("Error actualizando:", err));
}

//Eliminar productos
function eliminarProducto(id) {
  if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

  fetch(`/api/productos/${id}`, {
    method: "DELETE",
  })
    .then(r => {
      if (!r.ok) throw new Error("Error en el servidor");
      return r.json(); // ahora sí, porque ya devolvemos JSON
    })
    .then(() => {
      setProductos(prev => prev.filter(p => p.id !== id));
    })
    .catch(err => console.error("Error eliminando:", err));
}
// Frontend de la pantalla inventario
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
