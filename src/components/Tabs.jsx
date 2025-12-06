import { useState } from "react";
import "./Tabs.css";

export default function Tabs({ tabs }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* ENCABEZADO */}
      <div className="tabs-header">
        {tabs.map((t, i) => (
          <button
            key={i}
            className={i === active ? "tab-active" : ""}
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* CONTENIDO */}
      <div className="tabs-content">
        {tabs[active].content}
      </div>
    </div>
  );
}
