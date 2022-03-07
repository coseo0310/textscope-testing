<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  uri: string;
}

const props = defineProps<Props>();

const url = computed(() => `url(${props.uri})`);
</script>

<template>
  <div class="avatar-wrap">
    <div id="avatar"></div>
  </div>
</template>

<style lang="scss" scoped>
.avatar-wrap {
  position: relative;
  width: 56px;
  height: 56px;
  border: 2px solid transparent;
  border-radius: 50%;
  background-image: linear-gradient($layer1, $layer1),
    linear-gradient(to top, $basic-orange 0%, $basic-yellow 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  #avatar {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background-color: $point3;
    background-image: v-bind("url");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
  }
}
</style>
