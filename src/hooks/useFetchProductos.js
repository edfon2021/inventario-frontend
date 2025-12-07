import { useState, useEffect } from "react";

export default function useFetchProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL del backend
  const API = import.meta.env.VITE_API_URL;

  function cargarProductos() {
    setLoading(true);
    setError(null);

    // 🔥 Validación importante
    if (!API) {
      console.error(" ERROR: VITE_API_URL no está definida");
      setError("Configuración inválida del API");
      setLoading(false);
      return;
    }

    fetch(`${API}/api/inventario`)
      .then(async (resp) => {
        if (!resp.ok) {
          const msg = `Error del servidor: ${resp.status}`;
          console.error(msg);
          throw new Error(msg);
        }

        return resp.json();
      })
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando productos:", err);
        setError(err.message || "Error desconocido");
        setLoading(false);
      });
  }

  // Cargar solo al inicio
  useEffect(() => {
    cargarProductos();
  }, []);

  return {
    productos,
    loading,
    error,
    recargar: cargarProductos,
  };
}
