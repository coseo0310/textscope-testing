<script setup lang="ts">
import { ref, onMounted } from "vue";
import Button from "@/components/shared/Button.vue";
import { Viewer } from "@/services";

const testEl = ref<HTMLElement | null>(null);
const deg = ref<number>(0);
const zoom = ref<number>(0);

const viewer = new Viewer();
viewer.setImgURL(
  "https://images.unsplash.com/photo-1459156212016-c812468e2115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fGJhY2tncm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
);

const onDraw = () => {
  viewer.draw();
};

const onZoomIn = () => {
  if (zoom.value === 100) {
    return;
  }
  viewer.setZoomInOut("in");
  zoom.value += 10;
};
const onZoomOut = () => {
  if (zoom.value === -100) {
    return;
  }
  viewer.setZoomInOut("out");
  zoom.value -= 10;
};
const onZoomClear = () => {
  viewer.setZoomInOut("init");
  zoom.value = 0;
};

const onRotate = (d: number) => {
  deg.value = deg.value + d >= 360 || deg.value + d <= -360 ? 0 : deg.value + d;
  if (d === 0) {
    deg.value = 0;
  }
  viewer.setRotate(deg.value);
};

onMounted(() => {
  testEl.value?.appendChild(viewer.getViewer());
});
</script>

<template>
  <div class="test">
    <div class="viewer-wrap" ref="testEl"></div>
    <div class="btn-wrap">
      <div class="info zoom">{{ `ZOOM: ${zoom} %` }}</div>
      <div class="info deg">{{ `DEGREE: ${deg} deg` }}</div>
      <Button class="primary" @click="onDraw">draw</Button>
      <Button class="primary" @click="onZoomIn">zoom in</Button>
      <Button class="primary" @click="onZoomOut">zoom out</Button>
      <Button class="primary" @click="onZoomClear">zoom init</Button>
      <Button class="primary" @click="onRotate(-90)">left rotate</Button>
      <Button class="primary" @click="onRotate(90)">right rotate</Button>
      <Button class="primary" @click="onRotate(-1)">1deg left rotate</Button>
      <Button class="primary" @click="onRotate(1)">1def right rotate</Button>
      <Button class="primary" @click="onRotate(0)">init rotate</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.test {
  width: 100%;
  height: 100vh;
  background-color: $d2;
  display: grid;
  grid-template-columns: 1fr 200px;
  justify-content: space-between;
  align-items: center;

  .viewer-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: lightcoral;
  }

  .info {
    padding: 5px 0;
  }
  .btn-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 200px;
    padding: 5px;

    button {
      width: 150px;
      height: 50px;
      margin: 5px 0;
    }
  }
}
</style>
