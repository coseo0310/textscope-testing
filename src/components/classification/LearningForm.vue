<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useClassificationStore, useCommonStore } from "@/store";
import { path } from "@/router";
import { storeToRefs } from "pinia";
import Chart from "chart.js/auto";

let chart: Chart<"line", number[], number> | null = null;
let interval: NodeJS.Timeout;
const canvas = ref<HTMLCanvasElement | null>(null);
const destroy = ref<Function | null>(null);

const router = useRouter();
const routes = useRoute();
const commonStore = useCommonStore();
const classificationStore = useClassificationStore();
const { model } = storeToRefs(classificationStore);

const isTest = ref<boolean>(false);

const setChart = (canvas: HTMLCanvasElement) => {
  if (destroy.value) {
    destroy.value();
  }
  const width = document.body.clientWidth - 400;
  const ctx = canvas.getContext("2d");
  const gradientFill = ctx!.createLinearGradient(width, 0, 10, 0);
  // gradientFill.addColorStop(0, "rgba(103, 121, 215, 0)");
  // gradientFill.addColorStop(1, "rgba(103, 121, 215, 0.9)");

  const labels: number[] = [];
  for (let i = 0; i <= 100; i++) {
    labels.push(i);
  }

  const data: number[] = [];
  for (let i = 0; i < 90; i++) {
    const min = 60 - i;
    const max = 100 - i;
    const random = Math.floor(Math.random() * (max - min) + min);
    data.push(random);
  }

  const totalDuration = 100;
  const delayBetweenPoints = totalDuration / data.length;
  const previousY = (ctx: any) =>
    ctx.index === 0
      ? ctx.chart.scales.y.getPixelForValue(100)
      : ctx.chart
          .getDatasetMeta(ctx.datasetIndex)
          .data[ctx.index - 1].getProps(["y"], true).y;

  const c = new Chart(canvas, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          data,
          borderColor: "rgba(103, 121, 215, 1)",
          backgroundColor: gradientFill,
          borderWidth: 2,
          pointRadius: 0,
          fill: true,
        },
      ],
    },
    options: {
      animations: {
        x: {
          type: "number",
          easing: "linear",
          duration: delayBetweenPoints,
          from: NaN,
          delay(ctx: any) {
            if (ctx.type !== "data" || ctx.xStarted) {
              return 0;
            }
            ctx.xStarted = true;
            return ctx.index * delayBetweenPoints;
          },
        },
        y: {
          type: "number",
          easing: "linear",
          duration: delayBetweenPoints,
          from: previousY,
          delay(ctx: any) {
            if (ctx.type !== "data" || ctx.yStarted) {
              return 0;
            }
            ctx.yStarted = true;
            return ctx.index * delayBetweenPoints;
          },
        },
      },
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
          title: {
            display: true,
            text: "진행율(%)",
            align: "end",
            color: "#5b5a81",
            font: {
              family: "'Pretendard', 'sans-serif'",
              size: 18,
              weight: "600",
            },
          },
          grid: {
            display: true,
          },
          ticks: {
            maxTicksLimit: 25,
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
          title: {
            display: true,
            text: "Loss(%)",
            align: "end",
            color: "#5b5a81",
            font: {
              family: "'Pretendard', 'sans-serif'",
              size: 18,
              weight: "600",
            },
          },
          grid: {
            display: true,
          },
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            // callback: function (value) {
            //   const v = Number(value);
            //   return v >= 1000 ? `${(v / 1000).toFixed(0)}M` : v;
            // },
            stepSize: 10,
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
  destroy.value = () => c.destroy();
  chart = c;
};

const onResize = () => {
  if (!canvas.value) {
    return;
  }

  if (chart) {
    const width = document.body.clientWidth - 400;
    const ctx = canvas.value.getContext("2d");
    const gradientFill = ctx!.createLinearGradient(width, 0, 10, 0);
    // gradientFill.addColorStop(0, "rgba(103, 121, 215, 0)");
    // gradientFill.addColorStop(1, "rgba(103, 121, 215, 0.9)");
    chart.data.datasets[0].backgroundColor = gradientFill;
  }
};

watch(isTest, () => {
  if (!model.value) {
    return;
  }
  model.value.isTest = isTest.value;
});

onMounted(() => {
  if (!canvas.value) {
    return;
  }

  setChart(canvas.value);

  interval = setInterval(() => {
    if (!chart) {
      return;
    }
    const min = 50;
    const max = 70;
    const random = Math.floor(Math.random() * (max - min) + min);
    chart.config.data.datasets[0].data.push(random);
    chart.update();
    if (chart.config.data.datasets[0].data.length >= 100) {
      clearInterval(interval);
      isTest.value = true;

      const id = routes.query.id;
      commonStore.setConfirm(
        ["학습이 완료되었습니다.", "문서 분류 모델 리스트로 이동하시겠습니까?"],
        "info",
        () => {
          router.push({
            name: path.classification_register.name,
            query: { id },
          });
        },
        () => {},
        "이동"
      );
    }
  }, 1000);
  window.addEventListener("resize", onResize);
});

onUnmounted(() => {
  if (!destroy.value) {
    return;
  }
  destroy.value();
  clearInterval(interval);
  window.removeEventListener("resize", onResize);
});
</script>

<template>
  <div class="network-card">
    <canvas ref="canvas" height="100%"></canvas>
  </div>
</template>

<style lang="scss" scoped>
.network-card {
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 18px;

  canvas {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
