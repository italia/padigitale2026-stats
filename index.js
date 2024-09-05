import {
  Chart,
  Colors,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
} from "https://cdn.jsdelivr.net/npm/chart.js@4.4.4/+esm";
import data from "./data.js";

Chart.register(
  Colors,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend
);

(async function () {
  new Chart(document.getElementById("chart"), {
    type: "bar",
    data: {
      labels: Object.keys(data).map((d) => new Date(d).toLocaleDateString()),
      datasets: [
        {
          label: "Visitatori unici",
          data: Object.values(data).map(
            ({ nb_uniq_visitors }) => nb_uniq_visitors
          ),
        },
      ],
    },
  });
})();
