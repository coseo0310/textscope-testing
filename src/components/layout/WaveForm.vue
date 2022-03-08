<script setup lang="ts"></script>

<template>
  <div class="wave-form">
    <slot />
    <div class="wave-wrap">
      <div class="wave1"></div>
      <div class="wave2"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wave-form {
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .wave-wrap {
    width: 100%;
    position: absolute;
    bottom: 0;

    .wave1 {
      position: absolute;
      bottom: 0;
      height: 300px;
      width: 100vw;
      background: url(../../assets/svg/wave1.svg) repeat-x;

      @media (min-height: 1025px) {
        height: 800px;
      }
    }
    .wave2 {
      position: absolute;
      bottom: 0;
      height: 200px;
      width: 100vw;
      background: url(../../assets/svg/wave2.svg) repeat-x;

      @media (min-height: 1025px) {
        height: 600px;
      }
    }
  }
}
</style>
