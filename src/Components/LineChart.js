import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Col, Container } from "reactstrap";
import { registerables, Chart } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default function LineChart(props) {
  const { isActive, mappedTemp } = props;
  useEffect(() => {
    Chart.register(...registerables);
  }, []);

  const labels = mappedTemp.map(
    (x) => new Date(x.date).toLocaleString().split(" ")[0]
  );
  const data = mappedTemp.map((x) => x.averageTemperature.toFixed(0));

  const state = {
    labels: labels,
    datasets: [
      {
        label: "Temperature",
        fill: false,
        tension: 0.3,
        borderColor: "black",
        data: data,
        pointBackgroundColor: "black",
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: "black",
        align: "end",
        anchor: "end",
        font: { size: "14", weight: "550" },
      },
      legend: {
        labels: { filter: (l) => l.text !== "Temperature" },
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          drawBorder: true,
          color: "white",
        },
        ticks: {
          color: "white",
          fontSize: 12,
        },
      },

      y: {
        grid: {
          drawBorder: true,
          color: "white",
        },
        ticks: {
          beginAtZero: true,
          color: "white",
          fontSize: 12,
        },
      },
    },
  };

  return (
    <div>
      {isActive ? (
        <Container>
          <Col md="11" className="linechart-col">
            <Line data={state} options={options} plugins={[ChartDataLabels]} />
          </Col>
        </Container>
      ) : null}

      <br />
    </div>
  );
}
