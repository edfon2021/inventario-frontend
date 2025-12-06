import { useState } from "react";

export default function InventarioForm({ onGuardar }) {
  const [form, setForm] = useState({
    sku: "",
    nombre: "",
    categoria: "",
    subcategoria: "",
    precioCompra: "",
    precioVenta: "",
    cantidad:"",
    color:"",
    marca:"",
    descripcion: ""
  });

  function actualizar(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function guardar() {
    if (!form.sku || !form.nombre) {
      alert("SKU y Nombre son obligatorios.");
      return;
    }

    onGuardar(form);       // enviar producto al padre
    setForm({              // limpiar formulario
      sku: "",
      nombre: "",
      categoria: "",
      subcategoria: "",
      precioCompra: "",
      precioVenta: "",
      cantidad:"",
      color:"",
      marca:"",
      descripcion: ""
    });
  }

  return (
    <div className="inventario-form">
      <h2>Agregar Producto</h2>

      <div className="form-grid">

        <div>
          <label>SKU</label>
          <input name="sku" value={form.sku} onChange={actualizar} />
        </div>

        <div>
          <label>Nombre del Producto</label>
          <input name="nombre" value={form.nombre} onChange={actualizar} />
        </div>

        <div>
          <label>Categoría</label>
          <input name="categoria" value={form.categoria} onChange={actualizar} />
        </div>

        <div>
          <label>Subcategoría</label>
          <input name="subcategoria" value={form.subcategoria} onChange={actualizar} />
        </div>

        <div>
          <label>Precio de Compra</label>
          <input
            type="number"
            name="precioCompra"
            value={form.precioCompra}
            onChange={actualizar}
          />
        </div>

        <div>
          <label>Precio de Venta</label>
          <input
            type="number"
            name="precioVenta"
            value={form.precioVenta}
            onChange={actualizar}
          />
        </div>

        <div>
          <label>Cantidad</label>
          <input
            type="number"
            name="cantidad"
            value={form.cantidad}
            onChange={actualizar}
          />
        </div>

        <div>
          <label>Marca</label>
          <input name="marca" value={form.marca} onChange={actualizar} />
        </div>

        <div className="descripcion-box">
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={actualizar}
          />
        </div>

      </div>

      <button className="btn-guardar" onClick={guardar}>
        Agregar Producto
      </button>
    </div>
  );
}
