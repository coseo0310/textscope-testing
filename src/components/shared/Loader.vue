<script setup lang="ts">
import LoaderImg from "@/assets/img/loader.png";
import { useCommonStore } from "@/store";
import { storeToRefs } from "pinia";

const commonStore = useCommonStore();
const { isLoader, loaderMsg } = storeToRefs(commonStore);
</script>

<template>
  <article v-if="isLoader" :class="loader.layout">
    <div :class="loader.box">
      <img :src="LoaderImg" alt="loader" />
    </div>
    <p>{{ loaderMsg }}</p>
  </article>
</template>

<style lang="scss" module="loader">
.layout {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.48);
  width: 100vw;
  height: 100vh;
  z-index: 10;

  p {
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    padding: 10px;
  }
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  animation: rotate 1s infinite linear;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
