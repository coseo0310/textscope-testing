<script setup lang="ts">
import { computed } from "vue";
import { svgs } from "./svg";
import { IconType } from "./type";

interface Props {
  icons: IconType;
  on?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  on: false,
});

// const size = computed(() => `${props.size}`);
// const src = computed(() => `/src/assets/icons/${props.icons}.svg`);
const svg = computed(() => svgs[props.icons]);
</script>

<template>
  <!-- <img class="icon" :src="src" /> -->
  <svg
    :width="svg.width"
    :height="svg.height"
    :view-box="svg.viewBox"
    :fill="svg.fill"
    :xmlns="svg.xmlns"
  >
    <template v-if="svg.rect">
      <rect
        :width="svg.rect.width"
        :height="svg.rect.height"
        :rx="svg.rect.rx"
        :fill="svg.rect.fill"
      />
    </template>
    <template v-if="svg.path">
      <path
        v-for="p in svg.path"
        :fill-rule="p.fillRule"
        :clip-rule="p.clipRule"
        :d="p.d"
        :fill="svg.rect ? p.fill : ''"
        :stroke-width="p.strokeWidth"
        :stroke-linecap="p.strokeLinecap"
        :stroke-linejoin="p.strokeLinejoin"
        :class="{ fill: p.fill, stroke: p.stroke, on: props.on }"
      />
    </template>
  </svg>
</template>

<style lang="scss" scoped>
/* svg {
  path {
    &.fill {
      fill: $d4;
    }

    &.stroke {
      stroke: $d4;
    }
    &.fill.on {
      fill: $point-blue;
    }

    &.stroke.on {
      stroke: $point-blue;
    }
  }
} */
</style>
