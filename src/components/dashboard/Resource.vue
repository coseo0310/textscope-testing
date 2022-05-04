<script setup lang="ts">
import { ref, computed } from "vue";

const gpu = ref<number>(27);
const usage = computed(() => 880 - (880 * gpu.value) / 100);
const deg = computed(() => `${360 * (gpu.value / 100)}deg`);
</script>

<template>
  <div class="resource">
    <div class="title">4. 자원 관리 (GPU 사용률)</div>
    <div class="progress">
      <div class="circle">
        <div class="dot"></div>
        <svg>
          <circle cx="140" cy="140" r="140"></circle>
          <circle cx="140" cy="140" r="140"></circle>
        </svg>
        <div class="usage">{{ gpu }}%</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.resource {
  .title {
    font-size: 14px;
    font-weight: 700;
    color: $d5;
  }

  .progress {
    display: flex;
    color: $point-blue;

    .circle {
      position: relative;
      width: 400px;
      display: flex;
      justify-content: center;
      align-items: center;

      .dot {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
        transform: rotate(v-bind(deg));

        &::before {
          content: " ";
          position: absolute;
          left: 50%;
          top: 50px;
          width: 20px;
          height: 20px;
          background-color: $point-blue;
          border-radius: 50%;
          transform: translate(-50%, 0);
        }
      }

      svg {
        position: relative;
        width: 400px;
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: rotate(270deg);

        circle {
          width: 100%;
          height: 100%;
          fill: transparent;
          stroke-width: 20;
          stroke: $d3;
          transform: translate(60px, 60px);
        }

        :nth-child(2) {
          stroke: $point-blue;
          stroke-dasharray: 880;
          stroke-dashoffset: v-bind(usage);
        }
      }

      .usage {
        position: absolute;
        text-align: center;
        font-weight: 500px;
        font-size: 1.5rem;
      }
    }
  }
}
</style>
