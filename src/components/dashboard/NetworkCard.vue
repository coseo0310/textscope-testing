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
        "",
        "12:00",
        "",
        "14:00",
        "",
        "16:00",
        "",
        "18:00",
        "",
        "20:00",
        "",
        "22:00",
        "",
        "24:00",
        "",
      ],
      datasets: [
        {
          data: [
            18000, 12000, 18000, 21000, 16000, 11000, 22000, 28000, 25000,
            24000, 26000, 27000, 21000, 22000, 26000, 28000, 29000,
          ],
          borderColor: "rgb(75, 192, 192)",
          //   backgroundColor: "rgba(255, 164, 37, 1)",
          backgroundColor: gradientFill,
          tension: 0.4,
          pointRadius: [0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0],
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
            major: {
              enabled: true,
            },
          },
        },
        y: {
          grid: {
            display: false,
          },
          suggestedMin: 0,
          suggestedMax: 30000,
          ticks: {
            callback: function (value) {
              const v = Number(value);
              return v >= 1000 ? `${(v / 1000).toFixed(0)}M` : v;
            },
            stepSize: 10000,
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
