<script setup lang="ts">
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const canvas = ref<HTMLCanvasElement | null>(null);
const c = ref<unknown>(null);

onMounted(() => {
  if (!canvas.value) {
    return;
  }
  const ctx = canvas.value.getContext("2d");
  const gradientFill = ctx!.createLinearGradient(1500, 0, 10, 0);
  gradientFill.addColorStop(0, "rgba(255, 164, 37, 0)");
  gradientFill.addColorStop(1, "rgba(255, 164, 37, 0.9)");

  c.value = new Chart(canvas.value, {
    type: "line",
    data: {
      labels: [
        "",
        "10:00",
        "12:00",
        "14:00",
        "16:00",
        "18:00",
        "20:00",
        "22:00",
        "24:00",
        "",
      ],
      datasets: [
        {
          label: "My First Dataset",
          data: [
            80000, 65000, 59000, 70000, 81000, 56000, 55000, 45000, 80000,
            80000,
          ],
          borderColor: "rgb(75, 192, 192)",
          //   backgroundColor: "rgba(255, 164, 37, 1)",
          backgroundColor: gradientFill,
          tension: 0.3,
          pointRadius: 8,
          pointBorderWidth: 3,
          pointBackgroundColor: "rgb(255, 255, 255)",
          fill: true,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
        datalabels: {
          display: false,
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
          grid: {
            display: false,
          },
          min: 20000,
          max: 90000,
          ticks: {
            callback: function (value) {
              const v = Number(value);
              return v >= 1000 ? `${v / 1000}M` : v;
            },
            color: "#5b5a81",
            font: {
              family: "'Pretendard', 'sans-serif'",
              size: 18,
              weight: "400",
            },
          },
        },
      },
    },
  });
});
</script>

<template>
  <div class="network-card">
    <div class="title">네트워크 이용내역</div>
    <canvas ref="canvas" height="509px"></canvas>
  </div>
</template>

<style lang="scss" scoped>
.network-card {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: $d1;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.1);
  color: $d5;
  font-size: 18px;
  padding: 60px 40px;

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
    position: relative;
    width: 100%;
    height: 509px;
    padding: 30px 20px 0px 20px;
  }
}
</style>
