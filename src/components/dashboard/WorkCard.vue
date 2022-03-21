<script setup lang="ts">
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);

const canvas = ref<HTMLCanvasElement | null>(null);
const c = ref<unknown>(null);

onMounted(() => {
  if (!canvas.value) {
    return;
  }
  c.value = new Chart(canvas.value, {
    type: "bar",
    data: {
      labels: [
        "1.11",
        "1.12",
        "1.13",
        "1.14",
        "1.15",
        "1.16",
        "1.17",
        "1.18",
        "1.19",
      ],
      datasets: [
        {
          data: [120, 141, 157, 132, 152, 164, 156, 158, 137],
          backgroundColor: [
            "rgba(71, 173, 181, 1)",
            "rgba(103, 121, 215, 1)",
            "rgba(103, 121, 215, 1)",
            "rgba(103, 121, 215, 1)",
            "rgba(103, 121, 215, 1)",
            "rgba(255, 119, 119, 1)",
            "rgba(103, 121, 215, 1)",
            "rgba(103, 121, 215, 1)",
            "rgba(103, 121, 215, 1)",
          ],
          borderWidth: 1,
          maxBarThickness: 30,
          borderRadius: Number.MAX_VALUE,
          datalabels: {
            color: [
              "rgba(71, 173, 181, 1)",
              "rgba(103, 121, 215, 1)",
              "rgba(103, 121, 215, 1)",
              "rgba(103, 121, 215, 1)",
              "rgba(103, 121, 215, 1)",
              "rgba(255, 119, 119, 1)",
              "rgba(103, 121, 215, 1)",
              "rgba(103, 121, 215, 1)",
              "rgba(103, 121, 215, 1)",
            ],
            anchor: "end",
            font: {
              family: "'Pretendard', 'sans-serif'",
              size: 18,
              weight: "normal",
            },
            display: "auto",
            formatter: function (value) {
              return `${value}\n`;
            },
          },
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      scales: {
        title: {
          display: false,
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#5b5a81",
            font: {
              family: "'Pretendard', 'sans-serif'",
              size: 18,
              weight: "400",
            },
          },
        },
        y: {
          max: 220,
          beginAtZero: true,
          display: false,
          grid: {
            display: false,
          },
        },
      },
    },
  });
});
</script>

<template>
  <div class="work-card">
    <div class="title">업무 (개)</div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style lang="scss" scoped>
.work-card {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: $d1;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: flex-end;

  .title {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 18px;
    font-weight: 700;
    color: $d5;
    padding: 40px 30px;
  }

  canvas {
    width: 100%;
    height: 100%;
    padding: 0px 20px 30px 20px;
  }
}
</style>
