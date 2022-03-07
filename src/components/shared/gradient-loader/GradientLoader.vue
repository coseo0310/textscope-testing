<script setup lang="ts"></script>

<template>
  <div class="gradient-loader">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      preserveAspectRatio="xMidYMid meet"
      id="half1"
    >
      <defs>
        <linearGradient id="gradient">
          <stop offset="0%" id="stop1" />
          <stop offset="100%" id="stop2" />
          >
        </linearGradient>
      </defs>
      <g id="paths">
        <path
          d="M100 100 A 40 40 90 0 1 250 100"
          stroke="url(#gradient)"
          style="fill: transparent; fill-opacity: 1; stroke-width: 30"
        />
      </g>
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      preserveAspectRatio="xMidYMid meet"
      id="half2"
    >
      <defs>
        <linearGradient id="gradient2">
          <stop offset="0%" id="stop3" />
          <stop offset="100%" id="stop4" />
        </linearGradient>
      </defs>
      <g id="paths2">
        <path
          d="M100 100 A 40 40 90 0 1 250 100"
          stroke="url(#gradient2)"
          style="fill: transparent; fill-opacity: 1; stroke-width: 30"
        />
      </g>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.gradient-loader {
  position: relative;
  height: 100%;
  background-color: transparent;
  transform: scale(0.3);
  animation: spinner 1s infinite;

  #stop1 {
    stop-color: $stop1-color;
  }

  #stop2 {
    stop-color: $stop2-color;
  }

  #stop3 {
    stop-color: $stop3-color;
  }

  #stop4 {
    stop-color: $stop4-color;
  }
  &.white {
    #stop1 {
      stop-color: $stop1-white;
    }

    #stop2 {
      stop-color: $stop2-white;
    }

    #stop3 {
      stop-color: $stop3-white;
    }

    #stop4 {
      stop-color: $stop4-white;
    }
  }

  #half1 {
    position: absolute;
    top: 0;
    left: -25px;
    background-color: transparent;
  }
  #half2 {
    position: absolute;
    top: 50px;
    left: -25px;
    background-color: transparent;
    transform: rotate(180deg) scaleX(-1);
  }

  @keyframes spinner {
    100% {
      transform: scale(0.3) rotate(360deg);
    }
  }
}
</style>
