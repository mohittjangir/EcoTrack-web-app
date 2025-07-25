import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// import "tailwindcss/tailwind.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Energy Consumption (kWh)",
      data: [12, 19, 9, 14, 16, 11, 13],
      borderColor: "#4f46e5",
      backgroundColor: "#6366f1",
      tension: 0.3,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Weekly Energy Usage",
    },
  },
};

const devices = [
  { name: "Air Conditioner", status: true, usage: 4.5 },
  { name: "Heater", status: false, usage: 2.1 },
  { name: "Refrigerator", status: true, usage: 1.8 },
  { name: "LED Lights", status: false, usage: 0.9 },
];

export default function EcoTrackDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [deviceStates, setDeviceStates] = useState(devices);

  const toggleTheme = () => setDarkMode(!darkMode);

  const toggleDevice = (index) => {
    const updatedDevices = [...deviceStates];
    updatedDevices[index].status = !updatedDevices[index].status;
    setDeviceStates(updatedDevices);
  };

  return (
    <div className={darkMode ? "black bg-gray-900 text-white min-h-screen p-6" : "bg-gray-100 min-h-screen p-6"}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">EcoTrack Dashboard</h1>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
          onClick={toggleTheme}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 mb-8">
        <Line data={data} options={options} />
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Devices</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {deviceStates.map((device, index) => (
            <div
              key={index}
              className={darkMode ? "bg-black dark:bg-gray-700 p-4 rounded-xl shadow flex justify-between items-center" : "bg-white dark:bg-gray-700 p-4 rounded-xl shadow flex justify-between items-center"}
            >
              <div>
                <h3 className="text-lg font-bold">{device.name}</h3>
                <p className="text-sm">Usage: {device.usage} kWh</p>
              </div>
              <button
                onClick={() => toggleDevice(index)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  device.status ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}
              >
                {device.status ? "On" : "Off"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}