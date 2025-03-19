import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProjectPerformanceChart = () => {
  const data = {
    labels: ["0", "1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "Project Performance",
        data: [44, 69, 38, 79, 36, 80, 70],
        backgroundColor: "#5687F2",
        borderRadius: 0,
        barThickness: 25,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, font: { size: 18 } },
    },
    scales: {
      x: {
        grid: {
          display: true, // Show vertical grid lines
          drawBorder: true,
          drawOnChartArea: true,
          drawTicks: false,
          color: "#E0E0E0", // Set vertical grid line color
        },
        border: {
          display: true,
          color: "#606060", // X-axis border color (Green)
        },
        ticks: {
          color: "#333333", // Y-axis value color (Purple)
          font: { size: 12 },
          padding: 10,
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          display: false, // Hide horizontal grid lines
        },
        border: {
          display: true,
          color: "#606060", // Y-axis border color (Blue)
        },
        ticks: {
          color: "#333333", // Y-axis value color (Purple)
          font: { size: 12 }, // Customize font
        },
      },
    },
  };
  
  

  return (
    <>
    <h2 className="title-2 d-block mb-0">Project Performance</h2>
    <Card className="">
      <Card.Body>
        <Bar data={data} options={options} />
      </Card.Body>
    </Card>
    </>
  );
};

export default ProjectPerformanceChart;
