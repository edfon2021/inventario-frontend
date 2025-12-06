import { useState } from "react";
import useFetchProductos from "../hooks/useFetchProductos";
import useRegistrarVenta from "../hooks/useRegistrarVenta";

import "../styles/ventas.css";
import FormNavbar from "../components/FormNavbar";
import "../styles/form-navbar.css";
import VentasClienteForm from "../components/VentasClienteForm";
import VentasAgregarProducto from "../components/VentasAgregarProducto";
import VentasTabla from "../components/VentasTabla";
import VentasTotal from "../components/VentasTotal";

export default function VentasPage() {

  // ----- CARGAR INVENTARIO DESDE BACKEND -----
  const { productos: productosInventario, loading, error } = useFetchProductos();

  // ----- CLIENTE -----
  const [cliente, setCliente] = useState({
    nombre: "",
    apellidos: "",
    cedula: "",
    direccion: "",
    fecha: new Date().toISOString().split("T")[0], // fecha automática
  });

  function actualizarCliente(e) {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  }

  // ----- DETALLES -----
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const { registrarVenta, loadingVenta, errorVenta, ventaId } = useRegistrarVenta();
  const [cantidad, setCantidad] = useState(1);
  const [detalles, setDetalles] = useState([]);

  // Mientras carga el inventario
  if (loading) return <h2>Cargando inventario...</h2>;
  if (error) return <h2>Error al cargar inventario</h2>;

  // Buscar info del producto
  const productoInfo = productosInventario.find(
    p => p.id == productoSeleccionado
  );

  // ----- Agregar detalle -----
  function agregarDetalle() {
    if (!productoSeleccionado) return;
    if (cantidad <= 0) return;

    if (!productoInfo) {
      alert("Producto no encontrado.");
      return;
    }

    // Evitar duplicados
    const yaExiste = detalles.find(d => d.id === productoInfo.id);
    if (yaExiste) {
      alert("Este producto ya está agregado.");
      return;
    }

    const subtotal = productoInfo.precioVenta * cantidad;

    setDetalles([
      ...detalles,
      {
        id: productoInfo.id,
        nombre: productoInfo.nombre,
        precio: productoInfo.precioVenta,
        cantidad,
        subtotal
      }
    ]);
  }

  // ----- Quitar detalle -----
  function eliminarDetalle(id) {
    setDetalles(detalles.filter(d => d.id !== id));
  }

  // ----- Total -----
  const total = detalles.reduce((acc, item) => acc + item.subtotal, 0);


  //Enviar facturas
  async function enviarFactura() {
      const id = await registrarVenta({
        cliente,
        detalles,
        total
       });

      if (!id) {
        alert("No se pudo registrar la venta.");
        return;
       }

      alert("Venta registrada exitosamente. ID: " + id);

      // Reset del formulario
      setCliente({
         nombre: "",
         apellidos: "",
         cedula: "",
         direccion: "",
         fecha: new Date().toISOString().split("T")[0],
      });

      setDetalles([]);
      setProductoSeleccionado("");
      setCantidad(1);
    }


  return (
    <div className="ventas">
      <FormNavbar title="Panel de Ventas" />

      {/* FORMULARIO DEL CLIENTE */}
      <VentasClienteForm
        cliente={cliente}
        actualizarCliente={actualizarCliente}
      />

      {/* SELECCIÓN DE PRODUCTOS */}
      <VentasAgregarProducto
        productos={productosInventario}
        productoSeleccionado={productoSeleccionado}
        setProductoSeleccionado={setProductoSeleccionado}
        cantidad={cantidad}
        setCantidad={setCantidad}
        agregarDetalle={agregarDetalle}
      />

      {/* TABLA + TOTAL (AJUSTADOS AL MISMO ANCHO) */}
      <div className="ventas__content">
        <VentasTabla detalles={detalles} eliminarDetalle={eliminarDetalle} />
        <VentasTotal total={total} />
        {/* BOTÓN ENVIAR FACTURA */}
      <button className="ventas__btn-enviar" onClick={enviarFactura}>
          {loadingVenta ? "Guardando..." : "Enviar factura"}
       </button>
      </div>

      
    </div>
  );
}
