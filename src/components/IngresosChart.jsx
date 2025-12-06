import { useEffect } from "react";

export default function IngresosChart({ data }) {
  useEffect(() => {
    if (!window.google?.visualization) return;
    draw();
  }, [data]);

  function draw() {
    const productos = [...new Set(data.map(d => d.producto))];
    const meses = [...new Set(data.map(d => d.mes))];

    const dataArray = [["Producto", ...meses]];

    productos.forEach(prod => {
      const fila = [prod];
      meses.forEach(mes => {
        const r = data.find(d => d.producto === prod && d.mes === mes);
        fila.push(r ? r.ingresos : 0);
      });
      dataArray.push(fila);
    });

    const dt = window.google.visualization.arrayToDataTable(dataArray);
    const chart = new window.google.visualization.ColumnChart(
      document.getElementById("ingresos_chart")
    );

    chart.draw(dt, {
      title: "Ingresos por Producto",
      animation: { duration: 800, easing: "out" },
    });
  }

  return <div id="ingresos_chart" style={{ height: "350px" }}></div>;
}
