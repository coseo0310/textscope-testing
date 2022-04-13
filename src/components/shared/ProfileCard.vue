<script setup lang="ts">
import { HTTP } from "@/types";
import Frame from "@/assets/img/frame.png";

interface Props {
  user: HTTP.User;
  focus: boolean;
}

const props = defineProps<Props>();
const url = props.user.profile_img
  ? `url('${props.user.profile_img}')`
  : `url('${Frame}')`;
</script>

<template>
  <div class="profile-card" :class="{ focus: props.focus }">
    <div class="img"></div>
    <div class="info">
      {{ props.user.name }} {{ props.user.job_position }}
      {{ props.focus ? "(나)" : "" }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-card {
  width: 220px;
  height: 272px;
  background-color: $d2;
  border-radius: 20px;
  box-shadow: $shadow-alpha-1;
  padding: 10px;

  .img {
    width: 200px;
    height: 200px;
    background-image: v-bind("url");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    border-radius: 10px;
  }

  .info {
    font-size: 18px;
    font-weight: 400;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    color: $d5;
  }
  &.focus {
    background-color: $point-peacook;
    .info {
      color: $d1;
    }
  }
}
</style>
