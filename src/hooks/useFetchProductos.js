import { useState, useEffect } from "react";

export default function useFetchProductos() {

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function cargarProductos() {
    setLoading(true);
    fetch("/api/inventario")
      .then(r => r.json())
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando productos:", err);
        setError(err);
        setLoading(false);
      });
  }

  // Cargar solo la primera vez
  useEffect(() => {
    cargarProductos();
  }, []);

  return {
    productos,
    loading,
    error,
    recargar: cargarProductos
  };
}
