<script setup lang="ts">
import { ref, onMounted } from "vue";
import Chart, { ChartConfiguration, ChartDataset } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartType } from "@/types";

export type ChartData = ChartType.BarChartData;

interface Props {
  data: ChartData;
}

Chart.register(ChartDataLabels);

const COLOR_SET = ["#47ADB5", "#FFA426"];

const props = defineProps<Props>();

const canvas = ref<HTMLCanvasElement | null>(null);
const c = ref<unknown>(null);

onMounted(() => {
  if (!canvas.value) {
    return;
  }

  const datasets: ChartDataset<"bar", number[]>[] = props.data.datasets.map(
    (d, idx) => {
      return {
        label: `  ${d.legend}`,
        data: d.data,
        backgroundColor: COLOR_SET[idx],
        borderWidth: 1,
        maxBarThickness: 40,
        borderRadius: Number.MAX_VALUE,
        datalabels: {
          color: COLOR_SET[idx],
          anchor: "end",
          font: {
            family: "'Pretendard', 'sans-serif'",
            size: 18,
            weight: 600,
          },
          display: "auto",
          formatter: function (value: unknown) {
            return `${value}\n\n`;
          },
        },
      };
    }
  );

  const options: ChartConfiguration<"bar"> = {
    type: "bar",
    data: {
      labels: props.data.labels,
      datasets,
    },
    options: {
      plugins: {
        legend: {
          display: true,
          position: "top",
          align: "end",
          labels: {
            color: "#5b5a81",
            font: {
              family: "'Pretendard', 'sans-serif'",
              size: 18,
              weight: "600",
            },
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltip: {
          enabled: true,
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
              weight: "600",
            },
          },
        },
        y: {
          max: props.data.max,
          beginAtZero: true,
          display: false,
          grid: {
            display: false,
          },
        },
      },
    },
  };

  c.value = new Chart(canvas.value, options);
});
</script>

<template>
  <div class="chart-card">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style lang="scss" scoped>
.chart-card {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
