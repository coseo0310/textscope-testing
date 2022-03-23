<script setup lang="ts">
import { ref, onMounted } from "vue";
import Button from "@/components/shared/Button.vue";
import Input from "@/components/shared/Input.vue";
import { Viewer } from "@/services";
import admission1 from "@/assets/sample/admission/temp1.jpg";
import admission_json1 from "@/assets/sample/admission/temp1.json";

const testEl = ref<HTMLElement | null>(null);
const deg = ref<number>(0);
const zoom = ref<number>(0);
const dx = ref<string>("10");
const dy = ref<string>("10");
const dWidth = ref<string>("200");
const dHeight = ref<string>("50");

const viewer = new Viewer();

const onDraw = () => {
  viewer.draw();
};

const onZoomIn = () => {
  if (zoom.value === 80) {
    return;
  }
  viewer.setZoomInOut("in");
  zoom.value += 10;
};
const onZoomOut = () => {
  if (zoom.value === -80) {
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

const createRect = (type: "stroke" | "fill") => {
  viewer.setRectangle({
    id: `${Date.now()}`,
    dx: Number(dx.value),
    dy: Number(dy.value),
    dWidth: Number(dWidth.value),
    dHeight: Number(dHeight.value),
    type,
    color:
      type === "fill" ? "rgba(220, 118, 118, 0.2)" : "rgba(220, 118, 118, 1)",
  });
};

const onKeyup = (e: KeyboardEvent) => {
  const el = e.target as HTMLInputElement;

  if (!/[0-9]/.test(el.value)) {
    el.value = el.value.substring(0, el.value.length - 1);
    return;
  } else {
    switch (el.id) {
      case "dx":
        dx.value = el.value;
        break;
      case "dy":
        dy.value = el.value;
        break;
      case "width":
        dWidth.value = el.value;
        break;
      case "height":
        dHeight.value = el.value;
        break;
      default:
        break;
    }
  }
};

onMounted(() => {
  viewer.setImgURL(admission1);
  testEl.value?.appendChild(viewer.getViewer());
  for (const d of admission_json1.prediction.key_values) {
    viewer.setRectangle({
      id: d.id,
      dx: d.bbox.x,
      dy: d.bbox.y,
      dWidth: d.bbox.w,
      dHeight: d.bbox.h,
      type: "stroke",
      color: `rgba(220, 118, 118, 1)`,
      lineWidth: 5,
    });
  }
  viewer.draw();
});
</script>

<template>
  <div class="test">
    <div class="viewer-wrap" ref="testEl"></div>
    <div class="btn-wrap">
      <div class="info zoom">{{ `ZOOM: ${zoom} %` }}</div>
      <div class="info deg">{{ `DEGREE: ${deg} deg` }}</div>
      <div class="btn-box">
        <Button class="primary" @click="onDraw">draw</Button>
        <Button class="primary" @click="onZoomIn">zoom in</Button>
        <Button class="primary" @click="onZoomOut">zoom out</Button>
        <Button class="outline" @click="onZoomClear">clear zoom</Button>
        <Button class="primary" @click="onRotate(-90)">
          90deg left rotate
        </Button>
        <Button class="primary" @click="onRotate(90)">
          90deg right rotate
        </Button>
        <Button class="primary" @click="onRotate(-1)">1deg left rotate</Button>
        <Button class="primary" @click="onRotate(1)">1deg right rotate</Button>
        <Button class="outline" @click="onRotate(0)">clear rotate</Button>
      </div>
      <div class="rect-wrap">
        <div class="input">
          <span>dx:</span>
          <Input type="text" id="dx" :value="dx" @keyup="onKeyup" />
          <span>dy:</span>
          <Input type="text" id="dy" :value="dy" @keyup="onKeyup" />
          <span>dWidth:</span>
          <Input type="text" id="width" :value="dWidth" @keyup="onKeyup" />
          <span>dHeight:</span>
          <Input type="text" id="height" :value="dHeight" @keyup="onKeyup" />
        </div>
        <Button class="primary" @click="createRect('stroke')"
          >Stroke Rectangle
        </Button>
        <Button class="primary" @click="createRect('fill')">
          Fill Rectangle
        </Button>
        <Button class="outline clear" @click="viewer.removeRectangles()"
          >Clear</Button
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.test {
  width: 100%;
  height: 100vh;
  background-color: $d2;
  display: grid;
  grid-template-columns: 1fr 500px;
  justify-content: space-between;
  align-items: center;

  .viewer-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: rgba(240, 128, 128, 0.8);
  }

  .info {
    padding: 5px 0;
  }
  .btn-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 500px;
    padding: 5px;

    .btn-box {
      padding-left: 10px;
      button {
        width: 150px;
        height: 50px;
        margin: 5px;
      }
    }

    .rect-wrap {
      .input {
        display: flex;
        flex-direction: column;
      }
      button {
        width: 130px;
        height: 50px;
        margin: 10px 10px 0 10px;
      }
    }
  }
}
</style>
