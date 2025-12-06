import { useEffect } from "react";

export default function VentasChart({ data }) {

  useEffect(() => {
    if (!window.google) return;

    window.google.charts.load("current", { packages: ["corechart"] });
    window.google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      if (!data) return;

      const productos = [...new Set(data.map(d => d.producto))];
      const meses = [...new Set(data.map(d => d.mes))];

      const dataArray = [["Producto", ...meses]];

      productos.forEach(prod => {
        const fila = [prod];
        meses.forEach(mes => {
          const r = data.find(d => d.producto === prod && d.mes === mes);
          fila.push(r ? r.ventas : 0);
        });
        dataArray.push(fila);
      });

      const chartData = window.google.visualization.arrayToDataTable(dataArray);
      const chart = new window.google.visualization.ColumnChart(
        document.getElementById("chart_ventas")
      );

      chart.draw(chartData, {
        title: "Ventas por Producto",
        backgroundColor: "#fff",
        height: 400,
      });
    }
  }, [data]);

  return <div id="chart_ventas" />;
}
