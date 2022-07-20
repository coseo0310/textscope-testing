<script setup lang="ts">
import { Field } from "@/services/editor";

interface Props {
  items: Field[];
  types: "default" | "normal" | "complex";
}

const props = defineProps<Props>();
</script>

<template>
  <article :class="card.layout">
    <div v-for="(f, idx) in props.items" :class="card.wrap">
      <p :class="card.key">{{ `${idx + 1}. ${f.key}` }}</p>
      <input :class="card.value" type="text" :value="f.text" />
    </div>
  </article>
</template>

<style lang="scss" module="card">
.layout {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  height: calc(100% - 188px);
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: $n-10;

  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: transparent;
  }
}

.wrap {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 80px;
  padding: 0 10px;
}

.key {
  font-size: 12px;
  font-weight: 500;
  color: $n-200;
  padding: 5px 0;
}

.value {
  width: 100%;
  height: 40px;
  border: 1px solid $n-40;
  border-radius: 3px;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 400;
  color: $m-800;
}
</style>
