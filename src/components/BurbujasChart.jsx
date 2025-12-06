import { useEffect } from "react";
import * as d3 from "d3";

export default function BurbujasChart({ data }) {
  useEffect(() => {
    draw();
  }, [data]);

  function draw() {
    d3.select("#burbujas_chart").selectAll("*").remove();

    const svg = d3
      .select("#burbujas_chart")
      .append("svg")
      .attr("width", 900)
      .attr("height", 450);

    const margin = { top: 40, right: 20, bottom: 50, left: 60 };
    const width = 900 - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.ingresos) * 1.1])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.ventas) * 1.1])
      .range([height, 0]);

    const color = d3.scaleOrdinal(d3.schemeTableau10);

    g.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(x));
    g.append("g").call(d3.axisLeft(y));

    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.ingresos))
      .attr("cy", d => y(d.ventas))
      .attr("r", 0)
      .style("fill", d => color(d.producto))
      .style("opacity", 0.8)
      .transition()
      .duration(1000)
      .attr("r", d => Math.sqrt(d.precio) * 1.5);
  }

  return <div id="burbujas_chart" style={{ height: "400px" }}></div>;
}
