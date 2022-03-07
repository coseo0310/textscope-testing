<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  alarm: string;
  color?: "lomin" | "basic";
  border?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  alarm: "0",
  color: "lomin",
  border: false,
});

const width = computed(() =>
  props.alarm.length < 2 ? `16px` : `${16 + props.alarm.length * 5}px`
);
const radius = computed(() => (props.alarm.length < 2 ? `50%` : `8px`));
const right = computed(() =>
  props.alarm.length < 2 ? `-2px` : `-${props.alarm.length * 5 + 2}px`
);
const alarm = computed(() => (props.alarm === "0" ? "" : props.alarm));
</script>

<template>
  <div class="badge-wrap">
    <slot />
    <div
      id="badge"
      :class="{
        lomin: props.color === 'lomin',
        basic: props.color === 'basic',
        border: props.border,
      }"
    >
      {{ alarm }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.badge-wrap {
  position: relative;

  #badge {
    position: absolute;
    right: v-bind("right");
    top: 0;
    width: v-bind("width");
    height: 16px;
    /* border: 2px solid $d1; */
    border-radius: v-bind("radius");
    /* background-color: $point-blue; */
    color: $d1;
    font-size: 2px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(-2px);
  }

  .lomin {
    background-color: $point-blue;
  }
  .basic {
    background-color: $point-blue;
  }

  .border {
    border: 2px solid $d1;
  }
}
</style>
