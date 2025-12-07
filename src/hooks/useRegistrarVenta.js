import { useState } from "react";

export default function useRegistrarVenta() {
  const [loadingVenta, setLoadingVenta] = useState(false);
  const [errorVenta, setErrorVenta] = useState(null);
  const [ventaId, setVentaId] = useState(null);

  // URL del backend
  const API = import.meta.env.VITE_API_URL;

  async function registrarVenta({ cliente, detalles, total }) {
    setLoadingVenta(true);
    setErrorVenta(null);
    setVentaId(null);

    // Validación básica
    if (!cliente || !detalles || detalles.length === 0) {
      setErrorVenta("Datos incompletos");
      setLoadingVenta(false);
      return null;
    }

    // Validación del backend
    if (!API) {
      setErrorVenta("Configuración inválida del API");
      setLoadingVenta(false);
      return null;
    }

    const ventaPayload = {
      cliente,
      detalles,
      total,
      fecha: cliente.fecha,
    };

    try {
      const resp = await fetch(`${API}/api/ventas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ventaPayload),
      });

      // Manejar errores HTTP
      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        const msg = data.error || `Error del servidor (${resp.status})`;
        setErrorVenta(msg);
        setLoadingVenta(false);
        return null;
      }

      const data = await resp.json();
      setVentaId(data.ventaId);
      setLoadingVenta(false);
      return data.ventaId;

    } catch (err) {
      console.error("ERROR registrando venta:", err);
      setErrorVenta("Error de conexión con el backend");
      setLoadingVenta(false);
      return null;
    }
  }

  return {
    registrarVenta,
    loadingVenta,
    errorVenta,
    ventaId
  };
}
