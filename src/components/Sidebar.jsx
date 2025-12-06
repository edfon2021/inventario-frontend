import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Gestion de ventas</h2>

      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/inventario">Inventario</Link></li>
        <li><Link to="/ventas">Ventas</Link></li>
        
      </ul>
    </aside>
  );
}
