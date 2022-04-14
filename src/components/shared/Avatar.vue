<script setup lang="ts">
import Frame from "@/assets/img/frame.png";

interface Props {
  uri: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="avatar-wrap">
    <div
      id="avatar"
      :style="{
        backgroundImage: `url(${props.uri ? props.uri : Frame})`,
      }"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.avatar-wrap {
  position: relative;
  width: 56px;
  height: 56px;
  border: 2px solid transparent;
  border-radius: 50%;
  background-image: linear-gradient($d1, $d1),
    linear-gradient(to top, $point-blue 0%, $point-peacook 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  #avatar {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background-color: $d2;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
  }

  &.border-none {
    border: none;
    background-image: none;
  }

  &.size-medium {
    width: 65px;
    height: 65px;
    #avatar {
      width: 55px;
      height: 55px;
    }
  }
}
</style>
