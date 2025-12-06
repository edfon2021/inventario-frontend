import { useEffect } from "react";

export default function EvolucionChart({ data }) {
  useEffect(() => {
    if (!window.google?.visualization) return;
    draw();
  }, [data]);

  function draw() {
    const productos = [...new Set(data.map(d => d.producto))];
    const meses = [...new Set(data.map(d => d.mes))];

    const dataArray = [["Mes", ...productos]];

    meses.forEach(m => {
      const fila = [m];
      productos.forEach(prod => {
        const r = data.find(d => d.producto === prod && d.mes === m);
        fila.push(r ? r.ventas : 0);
      });
      dataArray.push(fila);
    });

    const dt = window.google.visualization.arrayToDataTable(dataArray);
    const chart = new window.google.visualization.LineChart(
      document.getElementById("evolucion_chart")
    );

    chart.draw(dt, {
      title: "Evolución de Ventas",
      curveType: "function",
      animation: { duration: 800, easing: "out" },
    });
  }

  return <div id="evolucion_chart" style={{ height: "350px" }}></div>;
}
