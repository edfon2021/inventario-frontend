import { useState } from "react";

export default function useRegistrarVenta() {
  const [loadingVenta, setLoadingVenta] = useState(false);
  const [errorVenta, setErrorVenta] = useState(null);
  const [ventaId, setVentaId] = useState(null);

  async function registrarVenta({ cliente, detalles, total }) {
    setLoadingVenta(true);
    setErrorVenta(null);
    setVentaId(null);

    if (!cliente || !detalles || detalles.length === 0) {
      setErrorVenta("Datos incompletos");
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
      const resp = await fetch("https://invetariofacturacion-eed5cpf0dybha0gg.canadacentral-01.azurewebsites.net/api/ventas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ventaPayload),
      });

      const data = await resp.json();

      if (!resp.ok) {
        setErrorVenta(data.error || "Error al registrar");
        setLoadingVenta(false);
        return null;
      }

      setVentaId(data.ventaId);
      setLoadingVenta(false);
      return data.ventaId;

    } catch (err) {
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
