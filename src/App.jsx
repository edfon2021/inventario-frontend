import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import DashboardPage from "./pages/DashboardPage";
import InventarioPage from "./pages/InventarioPage";
import VentasPage from "./pages/VentasPage";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        
        <Sidebar />

        <main style={{ marginLeft: "230px", padding: "20px", width: "100%" }}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/inventario" element={<InventarioPage />} />
            <Route path="/ventas" element={<VentasPage />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}
