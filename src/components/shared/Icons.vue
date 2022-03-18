<script setup lang="ts">
import { computed } from "vue";
import { svgs } from "@/assets/svg";
import { Icons } from "@/types";

export type IconType = Icons.IconType;

type Props = {
  icons: IconType;
  on?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  on: false,
});

const svg = computed(() => svgs[props.icons]);
</script>

<template>
  <svg
    :width="svg.width"
    :height="svg.height"
    :viewBox="svg.viewBox"
    fill="currentColor"
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
        :fill-rule="p.fillRule ? p.fillRule : 'evenodd'"
        :clip-rule="p.clipRule || 3"
        :d="p.d"
        :fill="
          svg.rect
            ? p.fill
            : p.fill === 'none' || !p.fill
            ? 'none'
            : 'currentColor'
        "
        :stroke="p.stroke ? `currentColor` : 'none'"
        :stroke-width="p.strokeWidth"
        :stroke-linecap="p.strokeLinecap ? p.strokeLinecap : 'round'"
        :stroke-linejoin="p.strokeLinejoin ? p.strokeLinejoin : 'round'"
      />
    </template>
  </svg>
</template>

<style lang="scss" scoped></style>
