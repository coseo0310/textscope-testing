<script setup lang="ts">
import Grid from "@/components/shared/Grid.vue";
import Frame from "@/assets/img/frame.png";
import { useSettingsStore } from "@/store";

const settingsStore = useSettingsStore();
</script>

<template>
  <div class="user-form">
    <Grid
      class="no-underline"
      :gridList="settingsStore.userList"
      :columns="settingsStore.userColumns"
    >
      <template v-slot:image="{ item }">
        <div
          class="image"
          :style="{
            backgroundImage: `url(${item.image ? item.image : Frame})`,
          }"
        />
      </template>
    </Grid>
    <div v-if="settingsStore.userList.length === 0" class="not-found">
      <img src="@/assets/img/magnifier.png" alt="magnifier" />
      <div class="text">검색 결과가 없습니다</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-form {
  height: 100%;

  .image {
    width: 35px;
    height: 35px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border-radius: 5px;
  }

  .not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 15vh;
    .text {
      color: $d5;
      font-size: 24px;
      font-weight: 600;
      padding: 30px 0;
    }
  }
}
</style>
