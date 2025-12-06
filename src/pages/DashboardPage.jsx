import { useEffect, useState } from "react";
import Tabs from "../components/Tabs";
import VentasChart from "../components/VentasChart";
import IngresosChart from "../components/IngresosChart";
import EvolucionChart from "../components/EvolucionChart";
import BurbujasChart from "../components/BurbujasChart";
import FormNavbar from "../components/FormNavbar";
import "../styles/form-navbar.css";

export default function DashboardPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://invetariofacturacion-eed5cpf0dybha0gg.canadacentral-01.azurewebsites.net/api/dashboard-subcategorias")
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error("Error cargando dashboard:", err));
  }, []);

  return (
    <div>
      <FormNavbar title="Dashboard de Ventas" />

      <Tabs
        tabs={[
          { label: "Ventas",    content: <VentasChart data={data} /> },
          { label: "Ingresos",  content: <IngresosChart data={data} /> },
          { label: "Evolución", content: <EvolucionChart data={data} /> },
          { label: "Burbujas (D3)", content: <BurbujasChart data={data} /> },
        ]}
      />
    </div>
  );
}
