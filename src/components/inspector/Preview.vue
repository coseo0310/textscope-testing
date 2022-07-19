<script setup lang="ts">
import { ref } from "vue";

const total = ref<number>(231);
const current = ref<number>(1);

const maxLength = (e: KeyboardEvent) => {
  const el = e.target as HTMLInputElement;
  if (!el) {
    return;
  }
  console.log(el.value.length);
  el.value = el.value.length > 3 ? el.value.slice(0, 3) : el.value;
};
</script>

<template>
  <article :class="container.layout">
    <div :class="search.layout">
      <p :class="search.text">Page</p>
      <div :class="search.box">
        <input
          :class="search.input"
          type="number"
          :defaultValue="current"
          @keyup="maxLength"
        />
        /
        {{ total }}
      </div>
    </div>
    <div :class="preview.layout">
      <div>scroll</div>
    </div>
  </article>
</template>

<style lang="scss" module="container">
.layout {
  width: 136px;
  height: 100%;
}
</style>

<style lang="scss" module="search">
.layout {
  width: 100%;
  height: 76px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 0;
}

.text {
  font-size: 11px;
  font-weight: 400;
}

.input {
  width: 30px;
  border: 1px solid $n-40;
  border-radius: 3px;
  margin-right: 5px;
  -moz-appearance: textfield;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 0 5px 0px;
  text-align: center;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>

<style lang="scss" module="preview">
.layout {
  width: 100%;
  height: 100%;

  overflow-y: scroll;
  overflow-x: hidden;

  background-color: lightblue;

  div {
    height: 2000px;
  }

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
</style>
