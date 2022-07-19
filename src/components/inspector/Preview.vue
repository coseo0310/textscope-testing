<script setup lang="ts">
import { ref } from "vue";
import { useInspectionStore } from "@/store";
import { storeToRefs } from "pinia";

const inspectionStore = useInspectionStore();
const { previewList, currentPage } = storeToRefs(inspectionStore);

const total = ref<number>(previewList.value.length);

const maxLength = (e: KeyboardEvent) => {
  const el = e.target as HTMLInputElement;
  if (!el) {
    return;
  }
  if (e.code === "Enter") {
    currentPage.value = Number(el.value);
    return;
  }
  el.value = el.value.length > 3 ? el.value.slice(0, 3) : el.value;
};

const onPage = (n: number) => {
  currentPage.value = n;
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
          :value="currentPage"
          @keyup="maxLength"
        />
        /
        {{ total }}
      </div>
    </div>
    <div :class="preview.layout">
      <div
        v-for="(p, idx) in previewList"
        :class="preview.card"
        @click="onPage(idx + 1)"
      >
        <div
          :class="{
            [preview.thumb]: true,
          }"
        >
          <p>{{ idx + 1 }}</p>
          <img
            :class="{ select: currentPage === idx + 1 }"
            :src="p.img"
            src="thumb"
          />
          <p></p>
        </div>
        <p :class="preview.text">
          {{ p.text }}
        </p>
        <p :class="preview.text">
          {{ `(${p.num}/${p.total})` }}
        </p>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.select {
  border: 2px solid $b-300;
  border-radius: 1px;
}
</style>

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
  height: calc(100% - 139px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;

  overflow-y: scroll;
  overflow-x: hidden;

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

.card {
  flex: 0 0 auto;
  width: 106px;
  height: 148px;
  margin: 10px 0;
  cursor: pointer;
}

.thumb {
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 80px;
    height: 100px;
    border: 1px solid $n-40;
    border-radius: 1px;
  }

  p {
    width: 16px;
    font-size: 9px;
    font-weight: 400;
    color: $m-400;
  }
}

.text {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 400;
  color: $m-800;
  padding-top: 5px;
}
</style>
