<script setup lang="ts"></script>

<template>
  <div class="ios-loader">
    <div class="bar bar1"></div>
    <div class="bar bar2"></div>
    <div class="bar bar3"></div>
    <div class="bar bar4"></div>
    <div class="bar bar5"></div>
    <div class="bar bar6"></div>
    <div class="bar bar7"></div>
    <div class="bar bar8"></div>
    <div class="bar bar9"></div>
    <div class="bar bar10"></div>
    <div class="bar bar11"></div>
    <div class="bar bar12"></div>
  </div>
</template>

<style lang="scss" scoped>
.ios-loader {
  position: relative;
  width: 90px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;

  .bar {
    width: 6%;
    height: 16%;
    background-color: $basic-orange;
    position: absolute;
    left: 49%;
    top: 43%;
    opacity: 0;
    border-radius: 50px;
    animation: fade 1s linear infinite;

    @keyframes fade {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    &.bar1 {
      transform: rotate(0deg) translate(0, -130%);
      animation-delay: 0s;
    }

    &.bar2 {
      transform: rotate(30deg) translate(0, -130%);
      animation-delay: -0.9167s;
    }

    &.bar3 {
      transform: rotate(60deg) translate(0, -130%);
      animation-delay: -0.833s;
    }
    &.bar4 {
      transform: rotate(90deg) translate(0, -130%);
      animation-delay: -0.7497s;
    }
    &.bar5 {
      transform: rotate(120deg) translate(0, -130%);
      animation-delay: -0.667s;
    }
    &.bar6 {
      transform: rotate(150deg) translate(0, -130%);
      animation-delay: -0.5837s;
    }
    &.bar7 {
      transform: rotate(180deg) translate(0, -130%);
      animation-delay: -0.5s;
    }
    &.bar8 {
      transform: rotate(210deg) translate(0, -130%);
      animation-delay: -0.4167s;
    }
    &.bar9 {
      transform: rotate(240deg) translate(0, -130%);
      animation-delay: -0.333s;
    }
    &.bar10 {
      transform: rotate(270deg) translate(0, -130%);
      animation-delay: -0.2497s;
    }
    &.bar11 {
      transform: rotate(300deg) translate(0, -130%);
      animation-delay: -0.167s;
    }
    &.bar12 {
      transform: rotate(330deg) translate(0, -130%);
      animation-delay: -0.0833s;
    }
  }

  &.white .bar {
    background-color: $layer1;
  }
}
</style>
